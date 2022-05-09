const rooms = [];
/*
room = {
    id: -1,
    ownerId:-1,
    guestId:-1,
    online: 0, // when >= 2, start video
}
*/

function getRoom(roomKey) {
  return rooms.find((room) => room.id == roomKey);
}

function userJoinRoom(roomKey, socketId, isOwner) {
  const room = rooms.find((room) => room.id == roomKey);
  if (room) {
    console.log("room: ", room);
    // room existed
    if (isOwner) {
      // incase user reconnect (F5)
      if (room.ownerId == -1) {
        room.online++;
      }
      room.ownerId = socketId;
    } else {
      // incase user reconnect (F5)
      if (room.guestId == -1) {
        room.online++;
      }
      room.guestId = socketId;
    }

    return room;
  } else {
    const newRoom = {
      online: 1,
      id: roomKey,
      ownerId: -1,
      guestId: -1,
    };

    if (isOwner) {
      newRoom.ownerId = socketId;
    } else {
      newRoom.guestId = socketId;
    }
    rooms.push(newRoom);
    return newRoom;
  }
}

function getOwnerId(roomKey) {
  const room = rooms.find((room) => room.id == roomKey);
  if (room) {
    return room.ownerId;
  } else {
    return -1;
  }
}
function getGuestId(roomKey) {
  const room = rooms.find((room) => room.id == roomKey);
  if (room) {
    return room.guestId;
  } else {
    return -1;
  }
}

function userLeaveRoom(userId) {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].ownerId === userId || rooms[i].guestId === userId) {
      if (rooms[i]) {
        if (rooms[i].ownerId === userId) {
          rooms[i].ownerId = -1;
        }
        if (rooms[i].guestId === userId) {
          rooms[i].guestId = -1;
        }
        rooms[i].online--;
      }
      console.log("user " + userId + "leave, roomAfterLeave ", rooms[i]);
    }
  }
}

module.exports = {
  getRoom,
  userJoinRoom,
  userLeaveRoom,
  getGuestId,
  getOwnerId,
};
