import { Text } from "@geist-ui/core";
import Loader from "./Loader";

export default function MeetingLoader() {
  return (
    <div className="container flex-column full-vp d-flex align-items-center justify-content-center">
      <Loader />
      <Text className="mt-3 text-muted" p>
        Cargando
      </Text>
    </div>
  );
}
