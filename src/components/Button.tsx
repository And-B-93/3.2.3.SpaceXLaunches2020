import { Button } from "@mantine/core";

interface SeeMoreButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const SeeMoreButton = ({ onClick, children }: SeeMoreButtonProps) => {
  return (
    <Button fullWidth variant="filled" radius="lg" onClick={onClick}>
      {children}
    </Button>
  );
};

export default SeeMoreButton;
