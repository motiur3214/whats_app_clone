import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { authentication, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Login =()=> {
  const [{},dispatch]=useStateValue();


const signIn=()=>{

  authentication
    .signInWithPopup(provider)
    .then((result)=>{
      dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
      });
    })
    .catch(error=> alert(error.messege))  
  };
  return (
      <div className="login">
      <div className="login_container">
         
      <img src="https://gumlet.assettype.com/freepressjournal%2Fimport%2F2018%2F11%2FWhatsapp.jpg?auto=format%2Ccompress&format=webp&w=640&dpr=1.0" alt="" />
     
      <div className="login_text">
      <h1>Sign in to Whats app clone</h1>
      </div>
      <Button onClick={signIn}>Sign In With Google</Button>
      </div>
      </div>
      )
  }
  
  export default Login
  