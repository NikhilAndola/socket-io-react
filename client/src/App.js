import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {

const socket = io.connect("http://localhost:3001");

const [message, setMessage] = useState("");

const [messageReceived, setMessageReceived] = useState("")

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", data => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder="Message..." onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Submit</button>

      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
