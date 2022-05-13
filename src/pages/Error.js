import { Button, Text } from "@geist-ui/core";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import MetaTags from "../Components/MetaTags";

export default function Error() {
  return (
    <>
      <MetaTags title="Ha ocurrido un error inexperado" />
      <div
        className="text-center container full-vp d-flex flex-column align-content-center justify-content-center"
        style={{ maxWidth: "600px" }}
      >
        <img
          src="./images/error.svg"
          className="w-100 d-block mx-auto"
          style={{ maxWidth: "300px" }}
        />
        <Text style={{ fontSize: "2rem" }} h1>
          Un error acaba de suceder
        </Text>
        <Text className="text-muted" p>
          Acaba de suceder un error desconocido dentro de la plataforma, puedes
          refrescar el navegador o regresar a la página de inicio.
        </Text>
        <Text type="success" className="mb-2" small>
          <Link
            to="/contact"
            className="w-100 justify-content-center d-flex align-items-center"
          >
            <BiEditAlt className="me-1" style={{ fontSize: "1rem" }} />
            Si el error persiste considera avisarnos
          </Link>
        </Text>
        <div className="d-flex w-100 justify-content-center">
          <Button
            onClick={() => window.location.reload()}
            type="success"
            className="me-2"
          >
            Refrescar
          </Button>
          <Link to="/">
            <Button>Ir al incio</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
