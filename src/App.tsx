import { useEffect, useReducer } from "react";
import LaunchCard from "./components/LaunchCard";
import "./App.css";
import ky from "ky";
import LaunchModal from "./components/Modal/LaunchModal";

interface CardProps {
  flight_number: number;
  mission_name: string;
  links?: { mission_patch_small: string | null | undefined };
  rocket?: { rocket_name: string | null | undefined };
  details: string | undefined | null;
}

interface LaunchState {
  launches: CardProps[];
  selectedLaunch: CardProps | null;
  isLoading: boolean;
  error: string | null;
}

const initialArg: LaunchState = {
  launches: [],
  selectedLaunch: null,
  isLoading: false,
  error: null,
};

type LaunchAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: CardProps[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SELECT_LAUNCH"; payload: CardProps }
  | { type: "CLEAR_SELECTED" };

function reducer(state: LaunchState, action: LaunchAction): LaunchState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, launches: action.payload };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "SELECT_LAUNCH":
      return { ...state, selectedLaunch: action.payload };
    case "CLEAR_SELECTED":
      return { ...state, selectedLaunch: null };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialArg);

  async function getAllLaunch() {
    dispatch({ type: "FETCH_START" });
    try {
      const launchData = await ky
        .get("https://api.spacexdata.com/v3/launches?launch_year=2020")
        .json<CardProps[]>();
      dispatch({ type: "FETCH_SUCCESS", payload: launchData });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Ошибка API";
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
    }
  }

  useEffect(() => {
    getAllLaunch();
  }, []);

  const handleSeeMore = (launch: CardProps) => {
    dispatch({ type: "SELECT_LAUNCH", payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLEAR_SELECTED" });
  };

  return (
    <div
      style={{
        width: "850px",
      }}
    >
      <h1>SpaceX Launches 2020</h1>

      <LaunchModal
        patchUrl={state.selectedLaunch?.links?.mission_patch_small}
        missionName={state.selectedLaunch?.mission_name}
        rocketName={state.selectedLaunch?.rocket?.rocket_name}
        details={state.selectedLaunch?.details}
        isOpen={!!state.selectedLaunch}
        onClose={handleCloseModal}
      />

      <div
        className="cards"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {state.launches.map((launch: CardProps) => (
          <LaunchCard
            patchUrl={launch.links?.mission_patch_small}
            missionName={launch.mission_name}
            rocketName={launch.rocket?.rocket_name}
            onSeeMore={() => handleSeeMore(launch)}
            key={`${launch.flight_number}${launch.mission_name}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
