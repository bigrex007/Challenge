export const formatDate = (createdAt: Date) => {
  const messageDate = new Date(createdAt);
  const today = new Date();
  
  const isToday =
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear();
  
  return isToday
    ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : messageDate.toLocaleDateString();
};
