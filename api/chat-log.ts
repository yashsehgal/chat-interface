import { getRandomInt } from "@/helpers";

type ChatLogType = {
  messageType: "message" | "new-member";
  chatMessage: string;
  chatDelay: number;
  chatSender: {
    firstName: string;
    lastName?: string;
    username: string;
  };
};

const DemoMessages = {
  "message": [
    "Heyyy",
    "We are live",
    "Hello everyone",
    "Love you work",
    "Hey everyone",
    "Hi everyone",
    "Hey, Good morning",
    "Lovely",
    "OMGG!!",
    "So many people, OMGG!",
    "🍕",
    "!upvote",
    "hello",
    "too good",
    "LGTM"
  ],
  "new-member": "New member joined"
};

const MESSAGE_TYPES: Array<Pick<ChatLogType, 'messageType'>> = [
  { messageType: "message" },
  { messageType: "new-member" }
];
const MESSAGE_USERS = [
  { firstName: "Yash", lastName: "Sehgal", username: "yashsehgal" },
  { firstName: "Peter", lastName: "Parker", username: "spiderman" },
  { firstName: "Tony", lastName: "Stark", username: "ironman" },
  { firstName: "Bruce", lastName: "Banner", username: "hulk" },
  { firstName: "Natasha", lastName: "Widow", username: "blackwidow" },
  { firstName: "Thor", lastName: "Oddinson", username: "thorthegod" },
  { firstName: "Steve", lastName: "Roger", username: "captainamerica" },
];

const populateChatLog = () => {
  const CHAT_LOG_SIZE = 1200;
  const CHAT_LOG_DELAYS = [300, 700, 600, 1290, 1200, 1560, 3000, 100, 120, 1240, 1246, 888, 567, 555, 321];

  // for storing chat logs
  let chatLogs: Array<ChatLogType> = [];

  for (let count = 0; count < CHAT_LOG_SIZE; count++) {
    const RANDOM_USER_INDEX = getRandomInt(0, MESSAGE_USERS.length - 1);
    const RANDOM_MESSAGE_TYPE_INDEX = getRandomInt(0, MESSAGE_TYPES.length - 1);
    const RANDOM_MESSAGE_LOCATION
      = (MESSAGE_TYPES[RANDOM_MESSAGE_TYPE_INDEX].messageType === "message"
        ? getRandomInt(0, DemoMessages.message.length - 1)
        : "new-member");
    const RANDOM_CHAT_DELAY_INDEX = getRandomInt(0, CHAT_LOG_DELAYS.length - 1);
    
    
    chatLogs.push({
      messageType: MESSAGE_TYPES[RANDOM_MESSAGE_TYPE_INDEX].messageType,
      chatMessage: RANDOM_MESSAGE_LOCATION === "new-member" 
                    ? DemoMessages["new-member"] 
                    : DemoMessages.message[RANDOM_MESSAGE_LOCATION],
      chatDelay: CHAT_LOG_DELAYS[RANDOM_CHAT_DELAY_INDEX],
      chatSender: {
        firstName: MESSAGE_USERS[RANDOM_USER_INDEX].firstName,
        lastName: MESSAGE_USERS[RANDOM_USER_INDEX].lastName,
        username: MESSAGE_USERS[RANDOM_USER_INDEX].username
      }
    })
  }

  return chatLogs;
}

/**
 * method to create a promise object with custom delay
 */
const delay = (delayMS: number) => new Promise(resolve => setTimeout(resolve, delayMS));


export {
  populateChatLog,
  delay
}

export type {
  ChatLogType,
}