import { Card, Image, Text, Flex } from "@mantine/core";
import SeeMoreButton from "./Button";

interface LaunchCardProps {
  patchUrl: string | null | undefined;
  missionName: string | undefined;
  rocketName: string | null | undefined;
  onSeeMore: () => void;
}

const LaunchCard = ({
  patchUrl,
  missionName,
  rocketName,
  onSeeMore,
}: LaunchCardProps) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder w={200} h={280}>
      <Flex
        h="100%"
        mih={0}
        justify="space-between"
        align="center"
        direction="column"
        wrap="nowrap"
      >
        <Image src={patchUrl} h={100} w={100} />

        <Text size="sm" c="dimmed">
          {missionName}
        </Text>

        <Text size="sm" c="dimmed">
          {rocketName}
        </Text>
        <SeeMoreButton onClick={onSeeMore}>SEE MORE</SeeMoreButton>
      </Flex>
    </Card>
  );
};

export default LaunchCard;
