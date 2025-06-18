import React from "react";
import UserList from "./UserList";

const Home = () => {
  return (
    <>
      {/* {data.displayName && (
        <h1 className="my-4 bg-black text-white p-2 inline-block rounded-md">
          Hello, {data.displayName} welcome to SwiftTalk
        </h1>
      )} */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        <UserList></UserList>
        {/* <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList> */}
      </div>
    </>
  );
};

export default Home;
