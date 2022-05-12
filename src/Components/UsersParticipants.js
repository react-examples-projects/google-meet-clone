import React from "react";
import useParticipants from "../hooks/useParticipants";
import UserParticipant from "./UserParticipant";
import css from "./styles/videoStreaming.module.scss";
import ParticipantControls from "./ParticipantControls";
import { Grid, Drawer } from "@geist-ui/core";

export default function UsersParticipants({ isVisible, toggleVisible }) {
  const usersParticipants = useParticipants();

  return (
    <Drawer visible={isVisible} onClose={toggleVisible} placement="right">
      <Drawer.Title>Participantes</Drawer.Title>
      <Drawer.Content>
        <div className={css.usersParticipants}>
          <Grid.Container gap={1}>
            {usersParticipants?.map((participant) => (
              <Grid
                sm={24}
                md={12}
                lg={12}
                xl={12}
                key={participant?.identity}
                className="w-100"
              >
                <div className={css.usersParticipantsWrapper}>
                  <UserParticipant
                    participant={participant}
                    isRemoteParticipant={true}
                  />
                  <ParticipantControls
                    participant={participant}
                    isRemoteParticipant={true}
                  />
                </div>
              </Grid>
            ))}
          </Grid.Container>
        </div>
      </Drawer.Content>
    </Drawer>
  );
}
