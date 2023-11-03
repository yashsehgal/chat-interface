"use client";
import { ChatLogType } from "@/api";
import { delay, populateChatLog } from "@/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MainView: React.FunctionComponent = () => {
  const [chat, setChat] = useState<Array<ChatLogType>>([]);
  const [message, setMessage] = useState<string>("");

  // adding chat data, in async manner.
  useEffect(() => {
    const sendCollectionWithDelays = async () => {
      const chatData = populateChatLog();
      for (const chatLog of chatData) {
        try {
          await sendDataWithDelay(chatLog, chatLog.chatDelay);
          // Handle the response as needed
        } catch (error) {
          // Handle errors, if any
          console.error('Error sending data:', error);
        }
      }
    };

    const sendDataWithDelay = async (data: ChatLogType, delayTime: number) => {
      try {
        await delay(delayTime);
        setChat(prevMessages => [...prevMessages, data]);
      } catch (error) {
        // Handle errors, if any
        console.error('Error sending data:', error);
        throw error;
      }
    };

    sendCollectionWithDelays();
  }, []);

  return (
    <div className="main-view view-container my-12">
      <header>
        <h1 className="leading-snug font-medium tracking-tighter text-3xl">{"Live-stream chat UI"}</h1>
      </header>
      <div className="chat-interface-container bg-neutral-50 p-4 mt-24 w-full h-[460px] rounded-xl shadow-xl shadow-neutral-200 border border-neutral-200">
        <div className="overflow-y-scroll flex flex-col items-start justify-end h-[360px] gap-3">
          {chat.map((item, index) => {
            return (
              <ChatMessage
                message={item.chatMessage}
                user={item.chatSender}
                type={item.messageType}
                key={index}
              />
            )
          })}
        </div>
        <div className="mt-4 flex items-center gap-4 max-md:grid">
          <input
            type={"text"}
            className="shadow-md rounded-lg border bg-neutral-50 w-full px-4 py-3 focus:outline-blue-400"
            placeholder="Say Hi 👋🏼 to chat"
            onChange={(e) => setMessage(e.target.value as string)}
            value={message}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setChat([
                  ...chat,
                  {
                    messageType: "message",
                    chatMessage: message,
                    chatSender: {
                      username: "You",
                      firstName: "Yash",
                      lastName: "Sehgal"
                    },
                    chatDelay: 10
                  }
                ]);
                setMessage("");
              }
            }}
          />
          <div className="emoji-reactions-wrapper shadow-md rounded-lg border bg-neutral-50 w-[260px] max-md:w-[240px] max-md:mt-6 max-md:mx-auto px-4 py-3 flex flex-row items-center justify-between">
            {["❤️", "🔥", "😍", "😂", "😭"].map((icon, index) => {
              return (
                <ReactionButton icon={icon} key={index} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const ReactionButton = ({ icon }: { icon: string }) => {
  const [isReacted, setIsReacted] = useState<boolean>(false);
  return (
    <>
      <motion.button className="scale-125 hover:scale-150 transition-all relative"
        onClick={() => {
          setIsReacted(true);
          setTimeout(() => {
            setIsReacted(false);
          }, 2000);
        }}
      >
        {icon}
        {/* {isReacted && <span className="reaction-display">{icon}</span>} */}
      </motion.button>
    </>
  )
}

const ChatMessage = ({ message, user, type }: { message: string; user: any, type: "message" | "new-member" }) => {
  return (
    <motion.div className="chat-message-log flex flex-row items-center gap-1 justify-start"
      initial={{
        opacity: 0.3,
        y: 6,
        x: 4
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0
      }}
    >
      <p>{type === "new-member" && "🎉"}</p>
      <p className={`chat-message-log__sender-name font-medium ${user.username === "You" && "text-red-500"}`}>
        {user.username}
      </p>
      <p className="chat-message-log__message-content text-neutral-500">{message}</p>
    </motion.div>
  )
}

export default MainView;