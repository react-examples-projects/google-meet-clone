import { Text, Button } from "@geist-ui/core";
import { BiVideo } from "react-icons/bi";
import useMediaQuery from "../hooks/useMediaQuery"; 

export default function MeetHero({ isOpen, toggleOpen }) {
  const isMobile = useMediaQuery("(max-width: 576px)");
  const scaleButton = isMobile ? 0.5 : 1;

  return (
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
        Crear reuniones rápidas y sencillas de gestionar con nuestra aplicación
        de videollamadas. Puedes invitar a cuantos desees, solo debes de guardar
        tu identificador de reunión y compartirlo a los demás!
      </Text>
      <div className="w-100">
        <Button
          scale={scaleButton}
          type="success"
          className="me-2"
          onClick={toggleOpen}
          disabled={isOpen}
        >
          Empezar ahora
          <BiVideo className="ms-1" style={{ fontSize: "1.1rem" }} />
        </Button>
        <Button scale={scaleButton} type="default">
          Acerda de
        </Button>
      </div>
    </div>
  );
}
