const express = require("express");
const twilio = require("twilio");
const router = express.Router();
const { TWILIO } = require("../../config/variables");
const { success, error } = require("../../helpers/httpResponses");

router.get("/token", async (req, res) => {
  const { identity, room } = req.query;
  const client = twilio(TWILIO.TWILIO_ACCOUNT_SID, TWILIO.TWILIO_AUTH_TOKEN);
  const rooms = client.video.v1.rooms(room);
  const participants = await rooms.participants.list({ status: "connected" });
  const participantsIds = participants.map((p) => p.identity);

  if (participants.includes(identity)) {
    return error(res, "Tu identificador no puede ser ese.", 401);
  }

  const accessToken = new twilio.jwt.AccessToken(
    TWILIO.TWILIO_ACCOUNT_SID,
    TWILIO.TWILIO_API_KEY,
    TWILIO.TWILIO_API_SECRET,
    { identity }
  );

  const grant = new twilio.jwt.AccessToken.VideoGrant({
    room,
  });

  accessToken.addGrant(grant);

  success(res, {
    identity, 
    room,
    token: accessToken.toJwt(),
  });
});

module.exports = router;
