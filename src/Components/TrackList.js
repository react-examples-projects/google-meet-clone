import Track from "./Track";

export default function TrackList({ publications }) {
  return (
    <div className="tracks-list">
      {publications?.map((publication) => {
        return <Track key={publication?.trackSid} publication={publication} />;
      })}
    </div>
  );
}
