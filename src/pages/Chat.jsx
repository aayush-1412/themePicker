import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as SendIcon } from "../assets/send.svg";
import WebFont from "webfontloader";
import { useTheme } from "../themes/useTheme";

import { useNavigate } from "react-router-dom";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40%;
  margin: auto;

  overflow-y: auto;
  max-height: 78vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const ChatBubbleContainer = styled(motion.div)`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  width: 100%;
  margin-bottom: 12px;
  max-width: 80vw;
  max-height: 82vh;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const InputContainer = styled.div`
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;

  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const InputField = styled.input`
  max-width: 70vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 10px 0 0 10px;
  outline: none;
  box-sizing: border-box;
  width: 40vw;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const SendButton = styled.button`
  padding: 10px;
  border-radius: 0 9px 9px 0;
  border: none;
  outline: none;
`;
const Button = styled.button`
  width: 70px;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s;
  border: none;
  outline: none;
`;
const AnimationDelayField = styled.input`
  width: 15%;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 10px 10px 10px 10px;
  outline: none;
  box-sizing: border-box;
  width: 40vw;

  @media (min-width: 768px) {
    width: 20%;
  }
`;

const delayVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ChatImage = styled.img`
  max-width: 50%;
  height: auto;
  border-radius: 20px;
`;

const initialMessages = [
  { id: 1, content: "Hello!", isUser: false },

  {
    id: 2,
    content: "I am Wysa - an AI chatbot built by therapists.",
    isUser: false,
  },
  {
    id: 3,
    content:
      "I am here to understand your concerns and connect you with the best resources available to support you.",
    isUser: false,
  },

  { id: 4, content: "Can I help?", isUser: false },
  { id: 5, content: "Hi there!", isUser: true },
  {
    id: 6,
    content: "Check out this image:",
    isUser: false,
    isImage: true,
    imageUrl:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/4143764/325500_63061.png",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [animationDelay, setAnimationDelay] = useState(350);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        content: inputValue,
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const { getFonts } = useTheme();
  const [bgColor, setBgColor] = useState("");
  const [txtFont, setTxtFont] = useState("");
  const [userText, setuserText] = useState("");
  const [userBg, setuserBg] = useState("");
  const [senderText, setsenderText] = useState("");
  const [senderBg, setsenderBg] = useState("");

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
    const getData = localStorage.getItem("theme");
    const actualData = JSON.parse(getData);
    console.log(actualData);

    setBgColor(actualData.colors.body);
    setTxtFont(actualData.font);
    setuserText(actualData.colors.user.text);
    setuserBg(actualData.colors.user.body);
    setsenderText(actualData.colors.sender.text);
    setsenderBg(actualData.colors.sender.body);
  }, []);

  const ChatBubble = styled.div`
    color: ${({ isUser }) => (isUser ? userText : senderText)};
    background-color: ${({ isUser }) => (isUser ? userBg : senderBg)};
    border-radius: ${({ isUser }) =>
      isUser ? "15px 0 15px 15px" : "0 15px 15px 15px"};

    padding: 12px 18px;
    max-width: 20vw;
    word-wrap: break-word;

    transition: box-shadow 0.3s;
    font-size: smaller;
    @media (max-width: 768px) {
      max-width: 45vw;
    }
  `;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        fontFamily: txtFont,
        background: bgColor,
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <AnimationDelayField
          style={{
            margin: "5px",
            backgroundColor: senderBg,
            color: senderText,
          }}
          type="number"
          placeholder="Animation Delay (ms)"
          value={animationDelay}
          onChange={(e) => setAnimationDelay(parseInt(e.target.value))}
        />

        <Button
          style={{
            backgroundColor: userBg,
            color: userText,
          }}
          onClick={() => navigate("/settings")}
        >
          Settings
        </Button>
        <Button
          style={{
            backgroundColor: userBg,
            color: userText,
          }}
          onClick={() => navigate("/")}
        >
          Logout
        </Button>
      </nav>

      <ChatContainer ref={chatContainerRef}>
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <ChatBubbleContainer
              key={message.id}
              initial="hidden"
              animate="visible"
              variants={delayVariants}
              transition={{
                duration: 0.2,
                delay: (index * animationDelay) / 1000 - 0.2,
              }}
              isUser={message.isUser}
            >
              {message.isImage ? (
                <ImageWrapper isUser={message.isUser}>
                  <ChatImage src={message.imageUrl} alt="Chat Image" />
                </ImageWrapper>
              ) : (
                <ChatBubble isUser={message.isUser}>
                  {message.content}
                </ChatBubble>
              )}
            </ChatBubbleContainer>
          ))}
        </AnimatePresence>
      </ChatContainer>
      <InputContainer>
        <InputWrapper>
          <InputField
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              backgroundColor: senderBg,
              color: senderText,
            }}
          ></InputField>
          <SendButton
            style={{
              backgroundColor: userBg,
            }}
            onClick={handleSendMessage}
          >
            <SendIcon width={16} height={16} />
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </div>
  );
};

export default Chat;
