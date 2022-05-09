const users = [];

// Join user to chat
function userJoin(id) {
  const user = { id, offer: null, candidates: [] };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// Get current user
function addUserCandidate(id, candidate) {
  const user = users.find((user) => user.id === id);
  if (user) {
    user.candidates.push(candidate);
  }
}
function getUserCandidates(id) {
  const user = users.find((user) => user.id === id);
  if (user) {
    return user.candidates;
  }
  return [];
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  addUserCandidate,
  getUserCandidates,
};
