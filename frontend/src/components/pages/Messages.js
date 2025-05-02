// src/components/Messages.js
import React from "react";
import Message from "./Message";
import UseGetMessages from "../hooks/UseGetMessages";
import { useSelector } from "react-redux";
import UseGetRealTimeMessage from "../hooks/UseGetRealTimeMessage";

function Messages() {
  UseGetMessages();
  UseGetRealTimeMessage();

  const { messages } = useSelector((store) => store.message);

  // if (!messages) return <p className="text-center text-gray-400 mt-4">Loading...</p>;

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages &&
        messages?.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
    </div>
  );
}

export default Messages;
