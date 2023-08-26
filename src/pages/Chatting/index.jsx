import { useState } from "react";

import NavBar from "../../components/NavBar";
import Button from "../../components/Button";

const Chatting = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="bg-yellow-300 w-screen h-screen flex flex-col">
        <div className="flex flex-col bg-teal-950 w-6/12 h-2/4 m-auto rounded-md">
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
