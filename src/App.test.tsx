import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { expect, it, describe, beforeAll, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { mockLaunches2020 } from "./mock";

vi.mock("ky", () => ({
  default: {
    get: vi.fn(() => ({
      json: vi.fn(() => Promise.resolve(mockLaunches2020)),
    })),
  },
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe("App component", function () {
  it("должен рендерить app", async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/spacex/i)).toBeInTheDocument();
    });
  });

  it("проверка наличия кнопки SEE MORE", async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    await waitFor(() => {
      const allSeeMoreBtn = screen.getAllByText(/more/i);
      const seeMoreBtn = allSeeMoreBtn[0];
      expect(seeMoreBtn).toBeInTheDocument();
    });
  });

  it("должно рендериться модальное окно при нажатии на кнопку SEE MORE", async () => {
    const modal = document.createElement("div");
    modal.id = "modal";
    document.body.appendChild(modal);

    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Starlink 2/i)).toBeInTheDocument();
    });

    const allSeeMoreBtn = screen.getAllByText(/more/i);
    const seeMoreBtn = allSeeMoreBtn[0];

    fireEvent.click(seeMoreBtn);

    await waitFor(() => {
      const modal = document.getElementById("modal");
      expect(modal).toBeInTheDocument();
    });
  });
});
