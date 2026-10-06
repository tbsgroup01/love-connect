import api from "./api.js";

export const getOrCreateConversation = async (match_id) => {
  return await api.post("/chats/conversation", { match_id });
};

export const getMessages = async (conversation_id) => {
  return await api.get(`/chats/messages/${conversation_id}`);
};

export const markMessagesAsRead = async (conversation_id) => {
  return await api.patch(`/chats/messages/${conversation_id}/read`);
};

export const getUserConversations = async () => {
  return await api.get("/chats/conversations");
};
export const sendMessage = async (conversation_id, content, messageType = "text") => {
  return await api.post("/chats/messages", {
    conversation_id,
    content,
    messageType,
  });
};
