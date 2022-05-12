import { Grid } from "@geist-ui/core";
import { withErrorBoundary } from "react-error-boundary";
import Error from "./Error";
import useToggle from "../hooks/useToggle";
import Navbar from "../Components/Navbar";
import NewMeetModal from "../Components/Modals/NewMeetModal";
import MeetHero from "../Components/MeetHero";
import MetaTags from "../Components/MetaTags";

function Meet() {
  const [isOpen, toggleOpen] = useToggle();
  const breakPoints = { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 };

  return (
    <>
      <MetaTags />
      <div className="full-vp">
        <Grid.Container gap={2}>
          <Grid className="full-vp flex-column" {...breakPoints}>
            <Navbar />
            <MeetHero {...{ isOpen, toggleOpen }} />
          </Grid>
          <Grid className="full-vp container-meet-bg" {...breakPoints} />
        </Grid.Container>
        <NewMeetModal {...{ isOpen, toggleOpen }} />
      </div>
    </>
  );
}

export default withErrorBoundary(Meet, {
  FallbackComponent: Error,
});
