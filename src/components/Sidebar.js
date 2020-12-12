import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chats from "./Chats";
import { database } from "../firebase";
import { useStateValue } from "../StateProvider";
function Sidebar() {
  const [rooms, setrooms] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    const getRooms = database.collection("rooms").onSnapshot((snapshot) =>
      setrooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      getRooms();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerright">
           
           <IconButton>
          <DonutLargeIcon />
          </IconButton>
          
          <IconButton>
          <ChatIcon />
          </IconButton>
          
          <IconButton>
          <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_search_component">
        <IconButton>
          <SearchIcon />
        </IconButton>
          <input placeholder="Lets chat" type="text" />
        </div>
      </div>

      <div className="sidebar_chatsGroups">
        <Chats addChat />
        {rooms.map((room) => (
          <Chats key={room.id} roomId={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
