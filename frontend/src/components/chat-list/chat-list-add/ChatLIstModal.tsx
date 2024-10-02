import { Box, Button, IconButton, InputBase, Modal, Paper, Stack, Typography, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, useContext } from "react";
import useGetUsers from "../../../hooks/useGetUsers";
import { AuthContext } from "../../../AuthContext";
import router from "../../../routes/router";

interface ChatListModalProps {
  open: boolean;
  handleClose: () => void;
  onUserClick: (userId: string) => void;
}

const ChatListModal = ({ open, handleClose }: ChatListModalProps) => {
  const { users, loading, error } = useGetUsers();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { user } = useContext(AuthContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleStartConversation = () => {
    if (selectedUser && user) {
      router.navigate(`/conversation/${user.userId}/${selectedUser}`);
      handleClose();
      setSelectedUser(null);
    }
  };

  const onClose = () => {
    handleClose();
    setSelectedUser(null);
  }

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}>
        <Stack spacing={2}>
          <Typography variant="h6" component='h2'>
            Add Chat
          </Typography>

          <Paper sx={{ p: "2px 4px", display: 'flex', alignItems: 'center' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search User"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            ) : filteredUsers.length > 0 ? (
              <List>
                {filteredUsers.map(listedUser => listedUser.userId !== user?.userId && (
                  <ListItem
                    key={listedUser.userId}
                    component="div"
                    onClick={() => setSelectedUser(listedUser.userId)} 
                    sx={{
                      cursor: 'pointer',
                      border: '1px solid #000',
                      borderRadius: '4px',
                      marginBottom: '8px',
                      padding: '8px',
                      backgroundColor: selectedUser === listedUser.userId ? '#d3e2ff' : 'inherit',
                      color: selectedUser === listedUser.userId ? '#000' : 'inherit',
                      '&:hover': {
                        backgroundColor: selectedUser === listedUser.userId ? '#b3d1ff' : '#f0f0f0', 
                        color: '#000',
                      },
                    }}
                  >
                    <ListItemText
                      primary={listedUser.username}
                      sx={{
                        fontWeight: selectedUser === listedUser.userId ? 'bold' : 'normal',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" align="center">
                No users found
              </Typography>
            )}
          </Box>

          {selectedUser && (
            <Button
              variant="outlined"
              onClick={handleStartConversation}
              sx={{
                width: '100%',
              }}
            >
              Start Conversation
            </Button>
          )}

          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListModal;
