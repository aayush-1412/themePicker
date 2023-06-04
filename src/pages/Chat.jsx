// import React, { useEffect, useState, useRef } from "react";
// import Dialog from "../components/ThemePicker/Dialog";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import ParentModal from "../components/Modal/ParentModal";
// import WebFont from "webfontloader";
// import { useTheme } from "../themes/useTheme";
// import ChatMessage from "../components/Chat/ChatMessage";

// const ChatWrapper = styled.div`
//   max-width: 70%;
//   min-width: 50%;
  

//   @media (max-width: 768px) {
//     max-width: 90%;
//   }
// `;

// const Chat = () => {
//   const [isMessageSent, setMessageSent] = useState(false);
//   const [bubbleDelay, setBubbleDelay] = useState(() => {
//     const savedBubbleDelay = localStorage.getItem("bubbleDelay");
//     return savedBubbleDelay ? parseInt(savedBubbleDelay, 10) : 100; // Default bubble delay of 100ms
//   });
//   const [currentBubbleDelay, setCurrentBubbleDelay] = useState(bubbleDelay);
//   const [message, setMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);

//   const handleSend = () => {
//     setMessageSent(true);
//   };

//   const handleBubbleDelayChange = (event) => {
//     const delay = parseInt(event.target.value, 10);
//     setBubbleDelay(delay);
//   };

//   const handleSaveBubbleDelay = () => {
//     localStorage.setItem("bubbleDelay", bubbleDelay.toString());
//     setMessageSent(false);
//   };

//   const handleMessageSend = (event) => {
//     event.preventDefault();
//     if (message) {
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { message, isUser: true },
//       ]);
//       setMessage("");
//       setMessageSent(true);
//     }
//   };

//   useEffect(() => {
//     setCurrentBubbleDelay(bubbleDelay);
//   }, [bubbleDelay]);

//   useEffect(() => {
//     if (isMessageSent) {
//       const timer = setTimeout(() => {
//         setMessageSent(false);
//       }, currentBubbleDelay);
//       return () => clearTimeout(timer);
//     }
//   }, [isMessageSent, currentBubbleDelay]);

//   useEffect(() => {
//     setChatMessages([]);
//   }, [currentBubbleDelay]);

//   ////////////////////////////////////
//   const { getFonts } = useTheme();
//   const [bgColor, setBgColor] = useState("");
//   const [txtFont, setTxtFont] = useState("");
//   const [headerColor, setHeaderColor] = useState("");

//   useEffect(() => {
//     WebFont.load({
//       google: {
//         families: getFonts(),
//       },
//     });
//     const getData = localStorage.getItem("theme");
//     const actualData = JSON.parse(getData);
//     console.log(actualData);

//     setHeaderColor(actualData.colors.text);
//     setTxtFont(actualData.font);
//     setBgColor(actualData.colors.body);

//     console.log(headerColor);
//   }, []);
//   return (
//     <>
//       <div
//         style={{
//           height: "100vh",
//           width: "100vw",
//           backgroundColor: bgColor,
//           display:"flex",
//           justifyContent:"center",
//           alignItems:"center",
//         }}
//       >
//         <ChatWrapper>
//           <div className="chat-container">
//             <ChatMessage
//               key="hello"
//               message="Hello!"
//               isUser={false}
//               delay={currentBubbleDelay}
//               onMessageSent={handleSend}
//             />
//             <ChatMessage
//               key="hi-there"
//               message="Hi there!"
//               isUser={true}
//               delay={currentBubbleDelay + bubbleDelay}
//               onMessageSent={handleSend}
//             />
//             <ChatMessage
//               key="how-are-you"
//               message="How are you?"
//               isUser={false}
//               delay={currentBubbleDelay + 2 * bubbleDelay}
//               onMessageSent={handleSend}
//             />
//             {chatMessages.map((chat, index) => (
//               <ChatMessage
//                 key={index}
//                 message={chat.message}
//                 isUser={chat.isUser}
//                 delay={currentBubbleDelay * (index + 1)}
//                 onMessageSent={handleSend}
//               />
//             ))}
//           </div>
//           <div>
//             <label htmlFor="bubbleDelayInput">Bubble Delay (ms): </label>
//             <input
//               type="number"
//               id="bubbleDelayInput"
//               value={bubbleDelay}
//               onChange={handleBubbleDelayChange}
//             />
//             <button onClick={handleSaveBubbleDelay}>Save</button>
//           </div>
//           <form onSubmit={handleMessageSend}>
//             <input
//               type="text"
//               value={message}
//               onChange={(event) => setMessage(event.target.value)}
//               placeholder="Type your message..."
//             />
//             <button type="submit">Send</button>
//           </form>
//         </ChatWrapper>
//       </div>
//     </>
//   );
// };

// export default Chat;
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { ReactComponent as SendIcon } from "../assets/send.svg"
import WebFont from "webfontloader";
import { useTheme } from "../themes/useTheme";
import NavBar from '../components/NavBar/NavBar';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40%;
  margin: auto;
  /* margin-top: 10%; */
  overflow-y: auto;
  max-height: 85vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width:768px) {
    width: 60%;
  }
`;

const ChatBubbleContainer = styled(motion.div)`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  width: 100%;
  margin-bottom: 12px;
  max-width: 80vw;
  max-height: 80vh;
  
`;

const ChatBubble = styled.div`
  background-color: "fff";
  border-radius: ${({ isUser }) => (isUser ?"15px 0 15px 15px" : '0 15px 15px 15px')};
  /* border-radius: 0 15px 15px 15px; */
  padding: 12px 18px;
  max-width: 20vw;
  word-wrap: break-word;
  /* box-shadow: 1px 4px 4px  rgba(0, 0, 0, 0.4); */
  transition: box-shadow 0.3s;
  font-size: smaller;
  
  
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
  /* align-items: center;
  margin-bottom: 10px;
  width:100%; */

  
`;

const InputField = styled.input`
  /* flex: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #007aff;
  width: 100%;

  
  

  @media (min-width: 768px) {
    width: 50%;
  } */
  /* width: 100%; */
  max-width: 70vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 10px 0  0 10px;
  outline: none;
  box-sizing: border-box;
  width: 40vw;

  
`;

const SendButton = styled.button`
  /* display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007aff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer; */
  padding: 10px;
  border-radius: 0 9px 9px 0;
  border: none;
  outline: none;
  
`;

const AnimationDelayField = styled(InputField)`
  width: 30%;

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
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const ChatImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
`;

const initialMessages = [
  { id: 1, content: 'Hello!', isUser: false },
 
  { id: 2, content: 'I am Wysa - an AI chatbot built by therapists.', isUser: false },
  { id: 3, content: 'I am here to understand your concerns and connect you with the best resources available to support you.', isUser: false },
  // { id: 5, content: 'Check out this image:', isUser: false, isImage: true, imageUrl: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/4143764/325500_63061.png' },
  { id: 4, content: 'Can I help?', isUser: false },
  { id: 5, content: 'Hi there!', isUser: true },
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [animationDelay, setAnimationDelay] = useState(350);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = { id: messages.length + 1, content: inputValue, isUser: true };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


// here goes the use state
const { getFonts } = useTheme();
  const [bgColor, setBgColor] = useState("");
  const [txtFont, setTxtFont] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const[bgcolor2,setBgColor2]=useState("")
  const[chatText,setChatText]=useState("")

// here wew will be fusing our theme
useEffect(() => {
  WebFont.load({
    google: {
      families: getFonts(),
    },
  });
  const getData = localStorage.getItem("theme");
  const actualData = JSON.parse(getData);
  console.log(actualData);

  setHeaderColor(actualData.colors.text);
  setTxtFont(actualData.font);
  setBgColor(actualData.colors.body);
  setChatText(actualData.colors.button.text)
  setBgColor2(actualData.colors.button.background)
  
 

  console.log(headerColor);
}, []);
// end of req function






  return (
    <div style={{
    height:"100vh",
    width:"100vw",
    fontFamily:txtFont,
    background:`linear-gradient(220deg,${bgColor} 63.17%,${bgcolor2} 94.92%)`
    }}> 
        <NavBar/>
    {/* <AnimationDelayField
          type="number"
          placeholder="Animation Delay (ms)"
          value={animationDelay}
          onChange={(e) => setAnimationDelay(parseInt(e.target.value))}
        /> */}
      <ChatContainer 
      
      ref={chatContainerRef}>
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <ChatBubbleContainer
              key={message.id}
              initial="hidden"
              animate="visible"
              variants={delayVariants}
              transition={{ duration: 0.2, delay: (index * animationDelay) / 1000 - 0.2 }}
              isUser={message.isUser}
            >
              {message.isImage ? (
                <ImageWrapper isUser={message.isUser}>
                  <ChatImage src={message.imageUrl} alt="Chat Image" />
                </ImageWrapper>
              ) : (
                <ChatBubble 
                style={{
                  backgroundColor:headerColor,
                  color:chatText,
                }}
                isUser={message.isUser}>{message.content}</ChatBubble>
              )}
            </ChatBubbleContainer>
          ))}
        </AnimatePresence>
        
      </ChatContainer>
      <InputContainer  >
        <InputWrapper>
          <InputField
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          >
            
          </InputField>
          <SendButton onClick={handleSendMessage}>
            <SendIcon width={16} height={16} />
          </SendButton>
        </InputWrapper>
        
      </InputContainer>
    </div>
  );
};

export default Chat;

