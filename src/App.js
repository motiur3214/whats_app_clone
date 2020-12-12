import React  from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatRoom from "./components/ChatRoom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import ChatIntro from "./components/ChatIntro"

import ErrorBoundary from "./components/ErrorBoundary";
function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_container">
          <ErrorBoundary>
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <ChatRoom />
              </Route>
              <Route path="/">
            <ChatIntro />
            </Route>
            </Switch>
          </Router>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}

export default App;
