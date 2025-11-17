import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
function App() {
  useEffect(() => {
    const blogFetch = fetch("https://blog-evtq.onrender.com/");
    const shirtFetch = fetch("https://threed-shirt-1.onrender.com/");
    const chatFetch = fetch("https://real-time-chat-1-icd4.onrender.com/");
  }, [])
  return (
    <main>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
  );
}

export default App;
