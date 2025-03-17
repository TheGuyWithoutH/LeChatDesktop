"use client";

import ChatView from "../../components/chat/ChatView";
import { useChat } from "../../hooks/chatHook";

/**
 * Component representing the new chat page.
 */
export default function Chat() {
  const [chat, sendMessage, loading, incomingMessage, messagesEndRef] =
    useChat();
  return (
    <>
      <ChatView
        loading={loading}
        chat={chat}
        incomingMessage={incomingMessage}
        sendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
      />
      <div className="absolute bottom-0 right-0 left-0 text-center p-2 mb-4 text-xs text-gray-400">
        Open the quick chat from anywhere in your computer by pressing{"  "}
        <kbd>Cmd + Shift + I</kbd>
      </div>
    </>
  );
}
