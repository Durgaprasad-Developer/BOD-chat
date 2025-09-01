import {useState, useEffect} from "react";
import {io} from "socket.io-client"

const socket  = io('http://localhost:8000');

function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      setMessages((prev)=>[...prev,data])
    })

    return(()=>{
      socket.off("receive_message")
    })
  },[])

  const sendMessage = ()=>{

    if(message.trim()){
      socket.emit("send_message", message);
      setMessage("");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-2xl shadow-md">
      <h1 className="text-xl font-bold mb-4">
        BOD
      </h1>

{/* message container */}
      <div className="h-64 overflow-y-auto p-2 bg-white rounded-md mb-4">
    {messages.map((msg, i)=>(
      <div className="p-1 border-b" key={i}>{msg}</div>
    ))}
      </div>

      {/* input chat */}

    <div className="flex gap-2">
      <input type="text" className="flex-1 p-2 border rounded" value={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={(e)=> e.key === "Enter" && sendMessage()} placeholder="Type a message" />
      <button className="bg-blue-500 text-white px-4 rounded" onClick={sendMessage}>Send</button>
    </div>
    </div>
  )
}

export default App
