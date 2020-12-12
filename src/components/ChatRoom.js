import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import "./ChatRoom.css";
import { Avatar,IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticon from "@material-ui/icons/SentimentVerySatisfied";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { useStateValue } from "../StateProvider";
function ChatRoom() {
  const [input, setinput] = useState("");
  const[seed,setSeed]=useState("");
  const { roomId } = useParams();
  const [roomname, setroomname] = useState("");
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () =>messagesEndRef.current.scrollIntoView();

  useEffect(() => {
    if (roomId) {
     
      database
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomname(snapshot.data().name));
      database
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })
          ))
        );
        scrollToBottom();
    
      }
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
  },[roomId])

 

  
 
const SendMessage = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
    scrollToBottom();
    
  };

  return (
    <div className="chatroom">
      <div className="chatroom_header">
        <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}/>
        <div className="chat_info">
          <h3>{roomname}</h3>
          <p>
            last message{" "}
            
            { new Date(
              messages[messages.length - 1]?.data.timestamp?.toDate()
            ).toDateString()} {" "} 
            
            {new Date(
              messages[messages.length - 1]?.data.timestamp?.toDate()
            ).toLocaleTimeString()}
            
          </p>
        </div>
        <div className="chatroom_header_inforight">
          <IconButton>
          <SearchIcon />
          </IconButton> 
          
          <IconButton>
          <AttachFileIcon />
          </IconButton>
          
          <IconButton>
          <MoreVertIcon />
          </IconButton>
       
        </div>
      </div>
      <div className="chatroom_body" id="chatroom_body">
        {
         
        messages.map((message) => (
          
          <p
            className={`chatroom_message ${message.data.name === user.displayName && `chatroom_messagerecierver`}`} key={message.id}>
            <span className="sender_name">{message.data.name}</span>
            {message.data.message}
            <span className="sender_timestamp ">
           
              {new Date(message.data.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))
      }
        
        <div ref={messagesEndRef} className="scroll_to_bottom"> hi</div>
      </div>
      <div className="chatroom_footer">
        <InsertEmoticon />
        <form>
          <input type="text"
            value={input}
            onChange={(event) => setinput(event.target.value)}
            placeholder="Type your message here" required="required"
          />
          <button onClick={SendMessage} type="submit">
            <SendIcon />
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default ChatRoom;
