/**
 * @file store.ts
 * @description The store file is responsible for defining the application state schema and the default values.
 */

// The chat type for the backend
export type Chat = {
  id: string;
  name: string;
  messages: Message[];
  lastMessage: Date;
  archived?: boolean;
};

// The message type for the backend
export type Message = {
  role: string;
  content: Content[];
  timestamp: Date;
};

// The content type for the backend
export type Content =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "document_url";
      documentUrl: string;
    }
  | {
      type: "image_url";
      imageUrl: string;
    };

// The schema of the key value store
export type SchemaType = {
  settings: UserSettings;
  chats: Chat[];
};

// The user settings type
export type UserSettings = {
  name: string;
  profile_picture: string;
  theme: "light" | "dark" | "system";
  shortcuts: {
    settings: string;
    chat: string;
    history: string;
  };
};

// The default settings
export const DEFAULT_SETTINGS: UserSettings = {
  name: "You",
  profile_picture:
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  theme: "system",
  shortcuts: {
    settings: "CTRL + S",
    chat: "CTRL + D",
    history: "CTRL + H",
  },
};

// The store keys definition
export const STORE_KEYS: { [key: string]: keyof SchemaType } = {
  SETTINGS: "settings",
  CHATS: "chats",
};
