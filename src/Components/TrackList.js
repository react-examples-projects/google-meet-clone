import Track from "./Track";
import css from "./styles/videoStreaming.module.scss";

export default function TrackList({
  publications,
  participant,
  isRemoteParticipant,
}) {
  return (
    <div className={css.trackList}>
      {publications?.map((publication) => {
        return (
          <Track
            key={publication?.trackSid}
            {...{ publication, participant, isRemoteParticipant }}
          />
        );
      })}
    </div>
  );
}
