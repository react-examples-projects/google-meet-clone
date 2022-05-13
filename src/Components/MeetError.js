import { Button, Text } from "@geist-ui/core";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";

export default function MeetError({ refetch }) {
  return (
    <div
      className="text-center container full-vp d-flex flex-column align-content-center justify-content-center"
      style={{ maxWidth: "600px" }}
    >
      <img
        src="./images/error_meet.svg"
        className="w-100 d-block mx-auto"
        style={{ maxWidth: "300px" }}
      />
      <Text style={{ fontSize: "2rem" }} h1>
        Sucedió un error al conectar con la reunión
      </Text>
      <Text className="text-muted" p>
        Acaba de suceder un error al tratar de contectarse a esta reunión, puede
        deberse a un error de conexion de red o problemas en nuestros
        servidores.
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
        <Button onClick={refetch} type="success" className="me-2">
          Reconectar
        </Button>
        <Link to="/">
          <Button>Ir al incio</Button>
        </Link>
      </div>
    </div>
  );
}
