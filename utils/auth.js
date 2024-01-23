const sessionIdToUser = new Map();

const setUser = (sessionId, user) => {
    return sessionIdToUser.set(sessionId, user);
}

const getUser = (sessionId) => {
    return sessionIdToUser.get(sessionId);
}

const deleteUser = (sessionId) => {
    sessionIdToUser.delete(sessionId);
}

module.exports = {
    setUser,
    getUser,
    deleteUser,
}
