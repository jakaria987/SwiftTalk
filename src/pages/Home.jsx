import React from "react";
import UserList from "./UserList";
import FriendRequestList from "./FriendRequestList";
import FriendList from "./FriendList";
import BlockList from "./BlockList";

const Home = () => {
  return (
    <>
      {/* {data.displayName && (
        <h1 className="my-4 bg-black text-white p-2 inline-block rounded-md">
          Hello, {data.displayName} welcome to SwiftTalk
        </h1>
      )} */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        <FriendRequestList></FriendRequestList>
        <FriendList></FriendList>
        <UserList></UserList>
        <BlockList></BlockList>
      </div>
    </>
  );
};

export default Home;
