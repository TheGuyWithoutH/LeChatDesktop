"use client";

import ChatInputMistral from "../../components/chat/ChatInput";
import { useChat } from "../../hooks/chatHook";
import ChatAnswer from "../../components/chat/ChatAnswer";
import ChatBubble from "../../components/chat/ChatBubble";
import { ChatProvider } from "../../components/navigation/historyProvider";

/**
 * Component representing the quick search page.
 */
export default function QuickSearch() {
  return (
    <ChatProvider addNewChat={() => {}}>
      <ChatDisplay />
    </ChatProvider>
  );
}

/**
 * Component representing the chat display in the quick search page.
 */
const ChatDisplay = () => {
  const [chat, sendMessage, loading, incomingMessage, messagesEndRef] =
    useChat();
  return (
    <div className="flex flex-col gap-1 justify-start items-center w-[608px] h-[670px] overflow-hidden">
      <div className="w-full">
        <ChatInputMistral
          sendMessage={sendMessage}
          onOpenFullScreen={() => {
            window.backend.showMainWindow(chat ? chat.id : "");
          }}
        />
      </div>
      {chat && (
        <div className="flex flex-col gap-10 pt-4 justify-start items-center w-full overflow-y-auto overflow-x-hidden box-content bg-white rounded-lg shadow-lg">
          {chat.messages.map((chat, index) => {
            if (chat.role === "user") {
              return (
                <ChatBubble
                  key={index}
                  message={chat.content}
                  timestamp={new Date(chat.timestamp)}
                />
              );
            } else {
              return (
                <ChatAnswer
                  key={index}
                  message={chat.content}
                  timestamp={new Date(chat.timestamp)}
                />
              );
            }
          })}
          {incomingMessage && <ChatAnswer message={incomingMessage.content} />}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};
