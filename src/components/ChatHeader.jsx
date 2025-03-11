import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onLineUser } = useAuthStore(); // Use the consistent online users array

  // Check if the selected user is online
  const isOnline =
    Array.isArray(onLineUser) && onLineUser.includes(selectedUser?._id);

  if (!selectedUser) return null; // Prevent rendering if no user is selected

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName || "User"}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">
              {selectedUser?.fullName || "Unknown"}
            </h3>
            <p className="text-sm text-base-content/70">
              {isOnline ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-gray-500">Offline</span>
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-1 hover:bg-base-300 rounded transition">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
