export const croppedLogoSrc =
  "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2FResponai-logos_transparent-cropped.png?alt=media&token=cbdc78be-1540-4c98-b82f-24416ffa114e";
export interface PageItem {
  isNew?: boolean;
  title: string;
  id?: string | number;
  href: string;
  target?: string;
}

export interface ChatListItem {
  threadName: string;
  previewMessage: string;
  sender: string;
  senderAvatar: string;
  recievers: string[];
}

export interface Message {
  createdAt: string;
  id: string;
  message: string;
  receiverId: string;
  senderId: string;
  threadId: string;
  updatedAt: string;
}

export interface Participant {
  userId: string;
  threadId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type ReceivedMessageData = {
  threadId: string;
  threadName: string;
  newMessage: Message;
  participants: string[];
};

export const chatListItems: ChatListItem[] = [
  {
    threadName: "Summer BBQ",
    previewMessage: "Hey! How are you doing?",
    sender: "John Doe",
    senderAvatar: "https://example.com/avatars/john-doe.jpg",
    recievers: ["Jane Smith", "Bob Johnson", "Mary Williams", "Tom Davis"],
  },
  {
    threadName: "Weekend Plans",
    previewMessage: "Hey! Are we still on for this weekend?",
    sender: "Jane Smith",
    senderAvatar: "https://example.com/avatars/jane-smith.jpg",
    recievers: ["John Doe", "Bob Johnson"],
  },
  {
    threadName: "Project Update",
    previewMessage:
      "Just wanted to let you know that the report is almost done!",
    sender: "Bob Johnson",
    senderAvatar: "https://example.com/avatars/bob-johnson.jpg",
    recievers: ["John Doe", "Jane Smith", "Mary Williams", "Tom Davis"],
  },
  {
    threadName: "Family Vacation",
    previewMessage: "Have you decided where we're going this year?",
    sender: "Mary Williams",
    senderAvatar: "https://example.com/avatars/mary-williams.jpg",
    recievers: ["John Doe", "Jane Smith", "Bob Johnson"],
  },
  {
    threadName: "Happy Hour",
    previewMessage: "Who's in for drinks after work?",
    sender: "Tom Davis",
    senderAvatar: "https://example.com/avatars/tom-davis.jpg",
    recievers: ["John Doe", "Jane Smith", "Bob Johnson", "Mary Williams"],
  },
];

export const featuresForPricing = [
  "AI-generated replies based on your texting style",
  "AI-generated memes/pictures of the conversation context",
  "Daily summaries of unread messages",
];

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const aiGeneratedRepliesForDemo = [
  "Hey! How are you doing?",
  "Same, I'm binge-watching a new show on Netflix",
  "Good luck on your test! Let me know if you need help studying.",
  // "Don't worry, you still have time. Just make sure to start soon and ask me if you need any help.",
  // "It's by this new artist that just got signed. I'll send you the link, you should check it out!",
  "I'm not sure, I'll have to check my calendar. I'll let you know!",
];

export const conversationsSummaryForDemo = [
  {
    threadName: "Summer BBQ",
    summary:
      "Your friends are planning a BBQ this weekend! They are not sure if you can make it, but they are hoping you can.",
  },
  {
    threadName: "Project Update",
    summary:
      "Your boss is asking for an update on the project. He wants to know if you are still on track to finish by the end of the week.",
  },
  {
    threadName: "Family Vacation",
    summary:
      "Your family wants to go on vacation this summer! Some places they are considering are Hawaii, Florida, and California.",
  },
  {
    threadName: "Happy Hour",
    summary:
      "Felipe wants to go out for drinks after work. He needs you to follow up with him to see if you can make it.",
  },
];

export const isMobileNumber = (number: string) => {
  const re = /^\d{10}$/;
  return re.test(number);
};

export const isEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const sendEventToWindowListener = (
  event_type: string,
  message: string,
  severity: string
) => {
  const event = new CustomEvent(event_type, {
    detail: { message, severity },
  });
  window.dispatchEvent(event);
};

export const grabSubsetOfMessage = (message: string) => {
  if (message.length < 40) return message;

  // Grab first 100 characthers of message.
  return message.substring(0, 40);
};

export function stringToColor(_string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < _string.length; i += 1) {
    hash = _string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}
