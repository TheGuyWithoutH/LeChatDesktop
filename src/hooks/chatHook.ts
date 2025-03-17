import Chat from "../data/chat";
import { useEffect, useRef, useState } from "react";
import Message from "../data/message";
import { generateChatName, sendChatMessages } from "../service/mistral";
import { useChatContext } from "../components/navigation/historyProvider";

/**
 * Custom hook to manage the chat state
 * @param chatId The chat id to fetch from the backend
 * @returns The chat object, the function to send a message, the loading state, the incoming message and the reference to the messages end
 */
const useChat = (chatId?: string) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState<Message | null>(null);
  const { addNewChat } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If a new chat was previously created and no messages were sent, delete the chat
    if (chat && chat.messages.length === 0) {
      window.backend.deleteChat(chat.id);
    }

    // If the chatId is undefined, create a new chat
    if (chatId !== undefined) {
      // Fetch the chat from the server
      window.backend
        .getChat(chatId)
        .then((chat: Chat) => {
          console.log("getting chat", chat);
          setChat(
            new Chat(chat.id, chat.name, chat.messages, chat.lastMessage)
          );
        })
        .catch(() => {
          console.log("Chat not found");
        });
    }

    return () => {
      // Cleanup the chat if no messages were sent
      if (chat && chat.messages.length === 0) {
        window.backend.deleteChat(chat.id);
      }
    };
  }, [chatId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (chat && chat.name === "New Chat" && loading === false) {
        console.log("Generating chat name", chat, loading);
        generateChatName(
          chat.messages[0].content
            .filter((content) => content.type === "text")
            .map((content) => content.text)
            .join("")
        ).then((name) => {
          addNewChat({ id: chat.id, name, lastMessage: chat.lastMessage });
          updateChat(new Chat(chat.id, name, chat.messages, chat.lastMessage));
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [chat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, incomingMessage]);

  const updateChat = (chat: Chat) => {
    setChat(chat);
    // Save the chat to the local storage
    window.backend.setChat(chat);
  };

  const createChat = () => {
    const newChat = new Chat(
      window.crypto.randomUUID(),
      "New Chat",
      [],
      new Date()
    );
    addNewChat(newChat);
    updateChat(newChat);

    return newChat;
  };

  const sendMessage = async (message: Message) => {
    let newChat;
    setLoading(true);

    if (chat === null) {
      newChat = createChat();
    } else {
      newChat = chat.clone();
    }

    newChat.messages.push(message);
    updateChat(newChat);

    const result = await sendChatMessages(newChat);
    let response = "";

    for await (const message of result) {
      const text = message.data.choices[0].delta.content;
      response += text;

      setIncomingMessage(
        new Message("assistant", [{ type: "text", text: response }])
      );
    }

    setIncomingMessage(null);
    setLoading(false);

    updateChat(
      new Chat(
        newChat.id,
        newChat.name,
        [
          ...newChat.messages,
          new Message("assistant", [{ type: "text", text: response }]),
        ],
        new Date()
      )
    );
  };

  return [chat, sendMessage, loading, incomingMessage, messagesEndRef] as const;
};

export { useChat };
