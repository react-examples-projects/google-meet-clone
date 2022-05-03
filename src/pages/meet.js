import { Text, Input, Button, Grid, useToasts } from "@geist-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { BiChevronsRight } from "react-icons/bi";
import Video from "twilio-video";
import axios from "axios";

export default function Meet() {
  const [blocked, setBlocked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [room, setRoom] = useState(uuidv4());
  const [identity, setIdentity] = useState("");
  const { setToast } = useToasts();
  const remoteTracksContainer = document.getElementById("remote-tracks");
  const localTracksContainer = document.getElementById("local-track");

  const joinRoom = async (e) => {
    e.preventDefault();
    try {
      setBlocked(true);
      console.info("Solicitando el token...");
      const res = await axios.get(
        `http://localhost:5000/api/twilio/token?identity=${identity}&room=${room}`
      );

      console.log("Creando la sala...");
      const dataRoom = res?.data?.data;
      const roomChat = await Video.connect(dataRoom?.token, {
        video: true,
        audio: true,
      });
      console.info(`Has entrado a una sala como: "${identity}"`);
      setIsConnected(true);
      roomChat.participants.forEach((p) => {
        console.log("Already in Room: '" + p.identity + "'");
      });

      roomChat.localParticipant.tracks.forEach((publication) => {
        const track = publication.track;
        localTracksContainer.appendChild(track.attach());
      });

      roomChat.on("participantConnected", (p) => {
        setToast({
          text: `${p.identity} entró a la sala`,
          type: "success",
          delay: 3000,
        });

        p.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;
            remoteTracksContainer.appendChild(track.attach());
          }
        });

        p.on("trackSubscribed", (track) => {
          remoteTracksContainer.appendChild(track.attach());
        });
      });

      roomChat.on("participantDisconnected", (p) => {
        console.log(p.identity + "salió de la sala")
        setToast({
          text: `${p.identity} salió de la sala`,
          type: "warning",
          delay: 3000,
        });
      });
    } catch (error) {
      console.log(error);
      setIsConnected(false);
      setBlocked(false);
    }
  };

  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "1000px" }}>
      <Grid.Container gap={2}>
        <Grid xs={24} sm={24} md={12} lg={12} xl={12}>
          <div>
            <Text h2>Entrar a una sala</Text>
            <Text className="text-muted" p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              fugit dolorem odit quia rerum aliquid modi illum corporis
              perferendis? Dolorem!
            </Text>

            <form onSubmit={joinRoom}>
              <div className="mb-3">
                <label htmlFor="username" className="d-block mb-3 text-muted">
                  Nombre de usuario
                </label>
                <Input
                  onChange={(e) => setIdentity(e.target.value)}
                  value={identity}
                  name="username"
                  id="username"
                  placeholder="Chapulin"
                  width="100%"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="identity" className="d-block mb-3 text-muted">
                  Identificador de la sala
                </label>
                <Input
                  readOnly={isConnected}
                  onChange={(e) => setRoom(e.target.value)}
                  value={room}
                  name="identity"
                  id="identity"
                  width="100%"
                />
              </div>

              {!isConnected && (
                <Button
                  htmlType="submit"
                  type="success"
                  width="100%"
                  loading={blocked}
                >
                  Entrar a la sala
                  <BiChevronsRight
                    className="ms-1"
                    style={{ fontSize: "1rem" }}
                  />
                </Button>
              )}
            </form>
          </div>
        </Grid>
        <Grid xs={24} sm={24} md={12} lg={12} xl={12}>
          <div>
            <div id="local-track" className="mt-3"></div>
            <div id="remote-tracks" className="mt-3"></div>
          </div>
        </Grid>
      </Grid.Container>
    </div>
  );
}
