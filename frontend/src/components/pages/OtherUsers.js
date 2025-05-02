import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/UseGetOtherUsers";
import { useSelector } from "react-redux";

function OtherUsers() {
  // Custom hook to fetch users
  useGetOtherUsers();

  // Get users from Redux store
  const { otherUsers } = useSelector((store) => store.user);

  // Safety check to avoid map error
  if (!Array.isArray(otherUsers) || otherUsers.length === 0) return null;

  return (
    <div className="overflow-auto flex-1">
      {otherUsers?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
}

export default OtherUsers;
