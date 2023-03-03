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
  "Auto-generated replies based on your texting style",
  "AI-generated memes",
  "Daily summaries of unread messages",
  "AI-generated notes based on conversations",
  "Basic integrations with other apps",
];
