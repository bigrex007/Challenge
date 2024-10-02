import { useState, useEffect, useContext } from 'react';
import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { AuthContext } from '../../AuthContext';
import ChatListModal from './chat-list-add/ChatLIstModal';
import callAPI from '../../api/callAPI';

const ChatList = () => {
  const [visible, setVisible] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { user, notifications, refreshNotifications } = useContext(AuthContext);

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await callAPI.get(`/users/${user?.userId}/conversations`);
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations', error);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user, notifications, refreshNotifications]);

  return (
    <>
      <ChatListModal
        onUserClick={() => {}}
        open={visible}
        handleClose={handleClose}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setVisible(true)} />
        <Divider component="div" />
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          {conversations.map((conversation, index) => (
            <ChatListItem
              userId={user?.userId}
              key={index}
              conversation={conversation}
            />
          ))}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
