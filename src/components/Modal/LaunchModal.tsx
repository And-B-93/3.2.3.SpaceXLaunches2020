import { Box, Button, Card, Image, Text } from "@mantine/core";
import { createPortal } from "react-dom";
import "./style.css";
import { useEffect } from "react";

interface LaunchModalProps {
  patchUrl: string | null | undefined;
  missionName: string | undefined;
  rocketName: string | null | undefined;
  details: string | undefined | null;
  isOpen: boolean;
  onClose: () => void;
}

const modalElement = document.getElementById("modal");

const LaunchModal = ({
  patchUrl,
  missionName,
  rocketName,
  details,
  isOpen,
  onClose,
}: LaunchModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  if (!modalElement) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <Card padding="lg" radius="md">
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text size="xl" c="dimmed" fw={700}>
              {missionName}
            </Text>
            <Button
              onClick={onClose}
              style={{ backgroundColor: "transparent", color: "black" }}
            >
              X
            </Button>
          </Box>
          <Card.Section>
            <Image
              src={patchUrl}
              h={200}
              w={200}
              fit="contain"
              style={{ display: "block", margin: "0 auto 0 auto" }}
            />
          </Card.Section>
          <Text fw={700}>Mission Name:</Text>
          <Text size="sm" c="dimmed">
            {missionName}
          </Text>
          <Text fw={700}>Rocket Name:</Text>
          <Text size="sm" c="dimmed">
            {rocketName}
          </Text>
          <Text fw={700}>Details:</Text>
          <Text size="sm" c="dimmed">
            {details}
          </Text>
        </Card>
      </div>
    </div>,
    modalElement
  );
};

export default LaunchModal;
