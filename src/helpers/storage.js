const saveSession = (dataRoom) => {
  const json = JSON.stringify(dataRoom);
  localStorage.setItem("session", json);
};

const deleteSession = () => {
  localStorage.removeItem("session");
};

const existsSession = () => {
  const session = localStorage.getItem("session");
  return !!session;
};

const getSession = () => {
  const session = localStorage.getItem("session");
  if (!session) return null;
  try {
    const _session = JSON.parse(session);
    return _session;
  } catch (e) {
    return null;
  }
};

export { saveSession, deleteSession, getSession, existsSession };
