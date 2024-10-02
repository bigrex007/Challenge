import {
  Avatar,
  Badge,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { formatDate } from '../../../utilities/utilities';
import router from '../../../routes/router';
import { useEffect, useState } from 'react';

type Conversation = {
  otherUserId: string;
  otherUsername: string;
  contentPreview: string;
  createdAt: Date;
  unreadCount: number;
};

interface ChatListItemProps {
  conversation: Conversation;
  userId: string | undefined;
}

const ChatListItem = ({ conversation, userId }: ChatListItemProps) => {
  const [unreadCounter, setUnreadCounter] = useState<number>();

  const clickConversation = () => {
    setUnreadCounter(0);
    router.navigate(`/conversation/${userId}/${conversation.otherUserId}`);
  }

  useEffect(() => {
    setUnreadCounter(conversation.unreadCount);
  }, [])

  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        component='div'
        onClick={clickConversation}
        sx={{
          '&.Mui-selected': {
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: 'action.selected',
            },
          },
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          cursor: 'pointer'
        }}
      >
        <ListItemAvatar>
          <Badge
            color="secondary"
            badgeContent={unreadCounter}
            invisible={unreadCounter === 0}
          >
            <Avatar
              alt={conversation.otherUsername}
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                conversation.otherUsername,
              )}&background=random`}
            />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={conversation.otherUsername}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {formatDate(conversation.createdAt)}
              </Typography>
              {' — '}
              {conversation.contentPreview}
            </>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="div" />
    </>
  );
};

export default ChatListItem;
