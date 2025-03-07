import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  // Fetch all users
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch users."
      );
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Fetch messages for a specific user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch messages."
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  sendMessage: async (messageData) => {
    //  Renamed to "sendMessage"
    const { selectedUser, messages } = get();
    if (!selectedUser || !selectedUser._id) {
      //  Check if selectedUser exists
      toast.error("No user selected for sending a message.");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set((state) => ({ messages: [...state.messages, res.data] })); //  Functional update
      toast.success("Message sent successfully!"); //  Success toast
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to send message."
      );
    }
  },

  // Set the selected user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
