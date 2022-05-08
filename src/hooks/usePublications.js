import { useEffect, useState } from "react";
export default function usePublications(participant) {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    setPublications(Array.from(participant.tracks.values()));

    const publicationAdded = (publication) =>
      setPublications((prevPublications) => [...prevPublications, publication]);
      
    const publicationRemoved = (publication) =>
      setPublications((prevPublications) =>
        prevPublications.filter((p) => p !== publication)
      );

    participant.on("trackPublished", publicationAdded);
    participant.on("trackUnpublished", publicationRemoved);
    return () => {
      participant.off("trackPublished", publicationAdded);
      participant.off("trackUnpublished", publicationRemoved);
    };
  }, [participant]);

  return publications;
}
