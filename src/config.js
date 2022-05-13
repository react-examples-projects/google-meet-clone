 const API_URL = "https://google-meet-api.vercel.app";
//const API_URL = "http://localhost:5000";
export const API_GET_TOKEN = (identity, room = "Meet Room") =>
  `${API_URL}/api/twilio/token?identity=${identity}&room=${room}`;
