import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import { database } from "../firebase";
import { Link } from "react-router-dom";

function Chats({ addChat, roomId, name }) {
  const [avatars, setavatars] = useState("");
  const [messages, setmessages] = useState("");

  useEffect(() => {
    setavatars(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (roomId) {
      database
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) =>
           ({
          id: doc.id,
          data: doc.data(),
        }))
           
           ));
    }
  }, [roomId]);

  const addnewChat = () => {
    const chatName = prompt("Enter A name");

    if (chatName) {
      database.collection("rooms").add({
        name: chatName,
      });
    }
  };

  return !addChat ? (
    <Link to={`/rooms/${roomId}`}>
      <div className="chats">
        <Avatar src={`https://avatars.dicebear.com/api/human/${avatars}.svg`} />
        <div className="chats_info">
          <h3>{name}</h3>
          <p>{messages[0]?.data.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={addnewChat} className="chats">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default Chats;
