import { useEffect, useState, useContext } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import callAPI from '../api/callAPI';
import { useNotification } from '../NotificationContext';

interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
}

const Users = () => {
  const { user, refreshNotifications } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const fetchUsers = async () => {
    try {
      const response = await callAPI.get('/users');
      setUsers(response.data);
    } catch {}
  };

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/login');
    }

    fetchUsers();
  }, [user, navigate]);

  const handleDeleteUser = async (userId: string) => {
    try {
      await callAPI.delete(`/users/${userId}`);
      fetchUsers();
      refreshNotifications();
      showNotification("User deleted successfully", "success");
    showNotification
    } catch (error) {
      console.error('Error deleting user');
      showNotification("Something went wrong, please contact your administrator.", "error");
    }
    
  };

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const isAdmin = (params.row as User).role === 'admin';
        return (
          <>
            <IconButton
              onClick={() => handleDeleteUser((params.row as User).userId)}
              disabled={isAdmin}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Box sx={{ height: '60vh', width: '100%' }}>
        <DataGrid 
          rows={users} 
          columns={columns}
          getRowId={(row) => row.userId}
          disableRowSelectionOnClick
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default Users;
