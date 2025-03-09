import React, { useState, useEffect } from "react";
import "./ChatBot.css";
import { FaMinus } from "react-icons/fa";
import { RiRobot3Fill } from "react-icons/ri";
import { IoLogoWechat } from "react-icons/io5";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Store the list of messages
  const [inputValue, setInputValue] = useState(""); // Store the content of the message being typed
  const [hasGreeted, setHasGreeted] = useState(false); // Track whether the chatbot has sent a greeting

  // Function to toggle the chat open/close state
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Send a greeting when the chatbot is opened for the first time
  useEffect(() => {
    if (isChatOpen && !hasGreeted) {
      const greetMessage = {
        text: "Hello! How can I assist you today?",
        sender: "bot",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
      setMessages((prevMessages) => [...prevMessages, greetMessage]);
      setHasGreeted(true);
    }
  }, [isChatOpen, hasGreeted]);

  // Function to call the API to send a message and receive a response
  const callAPI = async (userInput) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
      });
      const data = await response.json();
      if (response.ok) {
        return data.response; // Return the chatbot's response
      } else {
        console.error(data.error);
        return "Sorry, an error occurred.";
      }
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      return "Unable to connect to the chatbot server.";
    }
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    if (inputValue.trim() !== "") {
      const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      };
      const timestamp = formatTime();

      const newMessages = [
        ...messages,
        { text: inputValue, sender: "user", time: timestamp },
      ];
      setMessages(newMessages);

      const botResponse = await callAPI(inputValue);
      const botTimestamp = formatTime();

      setMessages([
        ...newMessages,
        { text: botResponse, sender: "bot", time: botTimestamp },
      ]);
      setInputValue("");
    }
  };

  // Function to handle pressing the Enter key
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot">
      {/* Chatbot icon */}
      <div className="messengerIcon" onClick={toggleChat}>
        <IoLogoWechat size={50} color="#0099FF" />
      </div>

      {/* Chat window */}
      <div className={`chatBox ${isChatOpen ? 'open' : ''}`}>
        <div className="chatHeader">
          <h className="headerText">
            <RiRobot3Fill />
          </h>
          <span className="headTitle">Support</span>
          <button onClick={toggleChat}>
            <FaMinus />
          </button>
        </div>
        <div className="chatMessages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message${message.sender === "user" ? " userMessage" : " botMessage"}`}
            >
              <div>{message.text}</div>
              <div className="messageTime">{message.time}</div>
            </div>
          ))}
        </div>
        <div className="chatFooter">
          <input
            type="text"
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="sendMessageButton" onClick={sendMessage}>
            <img src="./send-message.png" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
