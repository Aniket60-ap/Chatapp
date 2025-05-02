import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/UserSlices";

function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  // const isOnline = onlineUsers.includes(user?._id)
  const isOnline =
    Array.isArray(onlineUsers) && onlineUsers.includes(user?._id);

  console.log("Current user ID:", user?._id);
  console.log("Online Users:", onlineUsers);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-200 text-black" : ""
        } flex gap-2 items-center hover:text-black hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={user?.profilePhoto} alt="profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherUser;
