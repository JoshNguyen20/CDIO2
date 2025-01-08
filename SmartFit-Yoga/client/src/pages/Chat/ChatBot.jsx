import React, { useState, useEffect } from "react";
import "./ChatBot.css";
import { FaMinus } from "react-icons/fa";
import { RiRobot3Fill } from "react-icons/ri";
import { IoLogoWechat } from "react-icons/io5";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Lưu trữ danh sách tin nhắn
  const [inputValue, setInputValue] = useState(""); // Lưu trữ nội dung tin nhắn đang nhập
  const [hasGreeted, setHasGreeted] = useState(false); // Theo dõi xem chatbot đã gửi lời chào chưa

  // Hàm toggle trạng thái mở/đóng chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Gửi lời chào khi mở chatbot lần đầu
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

  // Hàm gọi API để gửi tin nhắn và nhận phản hồi
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
        return data.response; // Trả về phản hồi từ chatbot
      } else {
        console.error(data.error);
        return "Sorry, something went wrong.";
      }
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      return "Unable to connect to the chatbot server.";
    }
  };

  // Hàm xử lý khi gửi tin nhắn
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

  // Hàm xử lý nhấn phím Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot">
      {/* Biểu tượng chatbot */}
      <div className="messengerIcon" onClick={toggleChat}>
        <IoLogoWechat size={50} color="#0099FF" />
      </div>

      {/* Cửa sổ chat */}
      <div className={`chatBox ${isChatOpen ? 'open' : ''}`}>
        <div className="chatHeader">
          <h className="headerText">
            <RiRobot3Fill />
          </h>
          <span className="headTitle">Assitance</span>
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
            placeholder="Enter Messages"
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
