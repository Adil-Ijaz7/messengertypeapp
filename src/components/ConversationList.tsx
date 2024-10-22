import React from 'react';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversation: Conversation | null;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelectConversation,
  selectedConversation,
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
              selectedConversation?.id === conversation.id ? 'bg-blue-100' : ''
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex items-center">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{conversation.name}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;