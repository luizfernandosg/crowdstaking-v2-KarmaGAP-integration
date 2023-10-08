import Connectors from "../Connectors";
import { CloseModalButton, Container, Inner } from "./ui";

export default function ConnectorsModal({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  return (
    <Container handleClick={handleCloseModal}>
      <Inner>
        <CloseModalButton handleClick={handleCloseModal} />
        <div className="flex flex-col gap-8 md:gap-12">
          <Connectors />
        </div>
      </Inner>
    </Container>
  );
}
