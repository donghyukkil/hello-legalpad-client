import { useState, useEffect, useRef } from "react";

import { io } from "socket.io-client";

import { CONFIG } from "../../constants/config";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";
import SubNavBar from "../../components/SubNavBar";

const Chatting = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = useRef();

  useEffect(() => {
    socket.current = io(CONFIG.BACKEND_SERVER_URL);

    socket.current.on("chat message", message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [messages]);

  const handleSubmit = event => {
    event.preventDefault();

    if (socket.current && text.trim()) {
      socket.current.emit("chat message", text);
      setMessages(prevMessage => [...prevMessage, text]);
      setText("");
    }
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="bg-yellow-300 w-screen h-screen flex flex-col">
        <SubNavBar />
        <div className="flex bg-teal-950 w-3/4 h-3/4 m-auto py-0 justify-center rounded-md">
          <div className="m-auto my-8 h-full w-2/3">
            <div className="bg-red-400 w-full h-11 text-center line leading-10 text-2xl">
              Hello, legalPad!
            </div>
            <div className="bg-white w-full h-6 text-center leading-8 text-sm">
              다른 사용자에게 메시지를 보내보세요
            </div>
            <div
              className="p-3 bg-red-200 border border-gray-400 h-2/3 w-full"
              style={{
                lineHeight: "28px",
                fontSize: "20px",
                fontFamily: "Courier New",
              }}
            >
              <ul>
                {messages.map((message, index) => (
                  <div>
                    <li key={index}>{message}</li>
                  </div>
                ))}
              </ul>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between"
            >
              <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="text-center h-10"
              />
              <Button style={"bg-sky-400 my-4"}>전송</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
