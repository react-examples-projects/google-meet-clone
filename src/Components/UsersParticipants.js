import React from "react";
import useParticipants from "../hooks/useParticipants";
import UserParticipant from "./UserParticipant";

export default function UsersParticipants() {
console.log("se renderizo UsersParticipants")
  const usersParticipants = useParticipants();
  return (
    <div className="users-participants">
      {usersParticipants?.map((participant) => (
        <UserParticipant participant={participant} key={participant?.identity}/>
      ))}
    </div>
  );
}
