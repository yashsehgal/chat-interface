"use client";
import { ChatLogType } from "@/api";
import { delay, populateChatLog } from "@/api/chat-log";
import { useEffect, useState } from "react";

const MainView: React.FunctionComponent = () => {
  const [chat, setChat] = useState<Array<ChatLogType>>([]);

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
        <div className="mt-4">
          <input
            type={"text"}
            className="shadow-md rounded-lg border bg-neutral-50 w-full px-4 py-3"
            placeholder="Say Hi 👋🏼 to chat"
          />
        </div>
      </div>
    </div>
  )
}

const ChatMessage = ({ message, user, type }: { message: string; user: any, type: "message" | "new-member" }) => {
  return (
    <div className="chat-message-log flex flex-row items-center gap-1 justify-start">
      <p>{type === "new-member" && "🎉"}</p>
      <p className="chat-message-log__sender-name font-medium">
        {user.username}
      </p>
      <p className="chat-message-log__message-content text-neutral-500">{message}</p>
    </div>
  )
}

export default MainView;