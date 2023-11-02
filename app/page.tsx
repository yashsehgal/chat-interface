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
        {chat.map((item) => <>{item.chatMessage}</>)}
      </header>
    </div>
  )
}

export default MainView;