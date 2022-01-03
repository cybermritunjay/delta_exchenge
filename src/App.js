import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {getUser} from './app/Selector/selector'
import Home from "./routes/home";
import Login from './routes/login'
function App() {
  const [loggedIn,setLoggedIn] = useState(false)
  useEffect(()=>{
    const loggedInUser=getUser();
    console.log(loggedInUser)
    if (loggedInUser != null){
      setLoggedIn(true);
      console.log('setting to true')
    }
  },[])

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
