import { Button, Text } from "@geist-ui/core";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="text-center container full-vp d-flex flex-column align-content-center justify-content-center"
      style={{ maxWidth: "600px" }}
    >
      <img
        src="./images/404.svg"
        className="w-100 d-block mx-auto"
        style={{ maxWidth: "300px" }}
      />
      <Text style={{ fontSize: "2rem" }} h1>
        Recurso no encontrado
      </Text>
      <Text className="text-muted" p>
        La página o recurso que intentas acceder fue eliminado o no fue
        encontrado en nuestro servidores.
      </Text>
      <Link to="/meet">
        <Button type="success">Ir al incio</Button>
      </Link>
    </div>
  );
}
