import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/FirebaseContext";

import { setDoc, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";

import { makeId } from "../Utils";
import { ROOM_KEY_LENGTH } from "../Constant";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { db } = useFirebase();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [roomKey, setRoomKey] = useState("");

  useEffect(() => {
    console.log(currentUser);
  }, []);

  const handleRoomKeyChange = (e) => {
    // console.log(e.target);
    const value = e.target.value;
    setRoomKey(value);
  };

  const joinRoom = () => {
    navigate("room/" + roomKey);
  };

  const createNewRoom = () => {
    const roomKey = makeId(ROOM_KEY_LENGTH);

    // add new room to room collections
    const roomsRef = doc(db, "rooms", roomKey);
    setDoc(roomsRef, {
      createrUid: currentUser.uid,
      createdTime: Date.now(),
    }).then(() => {
      navigate("/room/" + roomKey);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          createNewRoom();
        }}
      >
        Create new room
      </button>
      <div style={{ marginTop: "0.5rem" }}>
        <input
          type="text"
          value={roomKey}
          onChange={(e) => {
            handleRoomKeyChange(e);
          }}
          placeholder="Room key"
          style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        />
        <button
          onClick={() => {
            joinRoom();
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Join room
        </button>
      </div>
    </>
  );
}

export default HomePage;
