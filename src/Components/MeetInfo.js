import { CopyToClipboard } from "react-copy-to-clipboard";
import { Text, Fieldset, Input, Button } from "@geist-ui/core";
import { useRoomContext } from "../context/RoomProvider";
import { BiCopy, BiShow } from "react-icons/bi";
import useToggle from "../hooks/useToggle";
import css from "./styles/videoStreaming.module.scss";
import cls from "classnames";

export default function MeetInfo() {
  const { roomName, identity } = useRoomContext();
  const [isOpen, toggleOpen] = useToggle(true);

  if (!isOpen)
    return (
      <div className={cls("position-absolute", css.meetInfoClose)}>
        <Button onClick={toggleOpen} scale={0.7} type="success-light" auto>
          Ver detalles
          <BiShow className="ms-1" style={{ fontSize: "15px" }} />
        </Button>
      </div>
    );

  return (
    <Fieldset className={cls("p-2 position-absolute", css.meetInfo)}>
      <Text h4>La reunión está lista</Text>
      <Text p>
        Para agregar nuevos participantes comparte este identificador para que
        pueden unirse de forma rápida
      </Text>

      <CopyToClipboard text={roomName}>
        <Input
          value={roomName}
          className={css.meetInfoInput}
          width="100%"
          iconRight={<BiCopy />}
          onClick={(e) => e.target.select()}
          readOnly
        />
      </CopyToClipboard>

      <Text className="d-block my-2 text-muted" small>
        Clikea el identificador para copiarlo
      </Text>

      <Button onClick={toggleOpen} scale={0.7} type="success-light" auto>
        Cerrar ventana
      </Button>

      <Fieldset.Footer>
        Te uniste como: <Text b>{identity}</Text>
      </Fieldset.Footer>
    </Fieldset>
  );
}
