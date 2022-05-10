import { Text, Button } from "@geist-ui/core";
import { BiVideo } from "react-icons/bi";

export default function MeetHero({ isOpen, toggleOpen }) {
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
  );
}
