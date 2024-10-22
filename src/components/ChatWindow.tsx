import React from 'react';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
}

interface ChatWindowProps {
  messages: Message[];
  selectedConversation: Conversation;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, selectedConversation }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b p-4 flex items-center">
        <img
          src={selectedConversation.avatar}
          alt={selectedConversation.name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">{selectedConversation.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.senderId === 1 ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.senderId === 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;