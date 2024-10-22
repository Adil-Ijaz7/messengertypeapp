import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
}

const initialConversations: Conversation[] = [
  { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?', avatar: 'https://source.unsplash.com/100x100/?portrait,woman' },
  { id: 2, name: 'Bob', lastMessage: 'Did you see the game last night?', avatar: 'https://source.unsplash.com/100x100/?portrait,man' },
  { id: 3, name: 'Charlie', lastMessage: 'Let\'s meet up this weekend!', avatar: 'https://source.unsplash.com/100x100/?portrait' },
];

const initialMessages: Message[] = [
  { id: 1, senderId: 2, text: 'Hey there!', timestamp: new Date('2023-04-10T10:00:00') },
  { id: 2, senderId: 1, text: 'Hi! How are you?', timestamp: new Date('2023-04-10T10:01:00') },
  { id: 3, senderId: 2, text: 'I\'m good, thanks! How about you?', timestamp: new Date('2023-04-10T10:02:00') },
];

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      const newMsg: Message = {
        id: messages.length + 1,
        senderId: 1, // Assuming the current user has ID 1
        text: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');

      // Update the last message in the conversation list
      const updatedConversations = conversations.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: newMsg.text }
          : conv
      );
      setConversations(updatedConversations);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r">
        <ConversationList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
        />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <ChatWindow
              messages={messages}
              selectedConversation={selectedConversation}
            />
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4" />
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;