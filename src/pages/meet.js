import { Tooltip, Text, Grid, Button, Modal, Image } from "@geist-ui/core";
import { withErrorBoundary } from "react-error-boundary";
import { BiVideo } from "react-icons/bi";
import Error from "./Error";
import MeetForm from "../Components/MeetForm";
import useToggle from "../hooks/useToggle";

function Meet() {
  const [isOpen, toggleOpen] = useToggle();
  return (
    <div className="full-vp">
      <Grid.Container gap={2}>
        <Grid
          className="full-vp flex-column"
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
        >
          <nav className="nav">
            <div className="container">
              <a href="#" className="text-muted d-block">
                Github
              </a>
              <a href="#" className="text-muted d-block">
                <Tooltip
                  text={
                    <div className="d-flex align-items-center">
                      <Image
                        src="./images/midudev.png"
                        className="d-block me-2"
                      />
                      <Text small>Crack</Text>
                    </div>
                  }
                  placement="bottom"
                >
                  Midudev
                </Tooltip>
              </a>

              <a href="#" className="text-muted d-block">
                Discord
              </a>
            </div>
          </nav>
          <div
            className="container-meet container mx-auto d-flex justify-content-center align-items-center flex-column full-vp"
            style={{
              maxWidth: "500px",
            }}
          >
            <Text className="text-colored" h1>
              Reunete con tus amigos y conocidos
            </Text>
            <Text className="text-muted" p>
              Crear reuniones rápidas y sencillas de gestionar con nuestra
              aplicación de videollamadas. Puedes invitar a cuantos desees, solo
              debes de guardar tu identificador de reunión y compartirlo a los
              demás!
            </Text>
            <div className="w-100">
              <Button
                type="success"
                className="me-2"
                onClick={toggleOpen}
                disabled={isOpen}
              >
                Empezar ahora
                <BiVideo className="ms-1" style={{ fontSize: "1.1rem" }} />
              </Button>
              <Button type="default">Acerda de</Button>
            </div>
          </div>
        </Grid>

        <Grid
          className="full-vp container-meet-bg"
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
        />
      </Grid.Container>

      <Modal visible={isOpen} onClose={toggleOpen}>
        <Modal.Title>Crear nueva reunión</Modal.Title>
        <Modal.Content>
          <MeetForm />
        </Modal.Content>
        <Modal.Action passive onClick={toggleOpen}>
          Cancelar
        </Modal.Action>
        <Modal.Action htmlType="submit" form="form-create-room">
          Crear
        </Modal.Action>
      </Modal>
    </div>
  );
}

export default withErrorBoundary(Meet, {
  FallbackComponent: Error,
});
