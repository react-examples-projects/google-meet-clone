import React from "react";
import useParticipants from "../hooks/useParticipants";
import UserParticipant from "./UserParticipant";
import css from "./styles/videoStreaming.module.scss";
import ParticipantControls from "./ParticipantControls";
import { Grid } from "@geist-ui/core";

export default function UsersParticipants() {
  const usersParticipants = useParticipants();

  return (
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
              <UserParticipant participant={participant} />
              <ParticipantControls
                participant={participant}
                isRemoteParticipant={true}
              />
            </div>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
}
