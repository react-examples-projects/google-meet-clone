import { Modal } from "@geist-ui/core";
import MeetForm from "../MeetForm";

export default function NewMeetModal({ isOpen, toggleOpen }) {
  return (
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
  );
}
