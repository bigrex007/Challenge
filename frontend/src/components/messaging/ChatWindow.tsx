import { useEffect, useState, useContext, useRef } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import callAPI from "../../api/callAPI";
import SendIcon from '@mui/icons-material/Send';

interface Message {
  messageId: string;
  content: string;
  sender: { userId: string; username: string };
  receiver: { userId: string; username: string };
  createdAt: string;
}

interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
}

const ChatWindow = () => {
  const { userId, otherUserId } = useParams();
  const { user, refreshNotifications } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [otherUser, setOtherUser] = useState<User | null>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await callAPI.get<Message[]>(`/users/${userId}/messages/${otherUserId}`);
        setMessages(response.data);

        await callAPI.patch(`/users/${userId}/messages/${otherUserId}/mark-as-read`);
      } catch (error) {
        console.error("Error fetching messages");
      }
    };

    const fetchOtherUser = async () => {
      try {
        const response = await callAPI.get<User>(`/users/${otherUserId}`);
        setOtherUser(response.data);
      } catch {}
    };
  
    if (userId && otherUserId) {
      fetchMessages();
      fetchOtherUser();
    }
  }, [userId, otherUserId]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await callAPI.post(`/users/${userId}/messages/${otherUserId}`, {
        content: newMessage,
      });

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
      refreshNotifications();
    } catch (error) {
      console.error("Error sending message");
    } finally {
    }
    refreshNotifications();
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Conversation with {otherUser?.username}
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.messageId}
            sx={{
              alignSelf: message.sender.userId === user?.userId ? "flex-end" : "flex-start",
              maxWidth: "60%",
              bgcolor: message.sender.userId === user?.userId ? "#007bff" : "#e0e0e0",
              color: message.sender.userId === user?.userId ? "#fff" : "#000",
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
              {otherUser?.username + ": sent at "}
              {new Date(message.createdAt).toLocaleTimeString()}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef}></div>
      </Box>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        sx={{
          mt: 2,
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ bgcolor: "background.paper", borderRadius: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{ minWidth: "100px" }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Stack>
  );
};

export default ChatWindow;
