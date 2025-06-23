import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { auth } from "../firebase.config";
import FriendRequestList from "./FriendRequestList";

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [checkRequestId, setCheckRequestId] = useState([]);
  const [checkFriendId, setCheckFriendId] = useState([]);
  useEffect(() => {
    const userListRef = ref(db, "usersList/");
    onValue(userListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (item.key != auth.currentUser.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);

  // check request list
  useEffect(() => {
    const requestListRef = ref(db, "friendRequestList/");
    onValue(requestListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderId + item.val().receiverId);
      });
      setCheckRequestId(array);
    });
  }, []);

  useEffect(() => {
    const requestListRef = ref(db, "friendList/");
    onValue(requestListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderId + item.val().receiverId);
      });
      setCheckFriendId(array);
    });
  }, []);

  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequestList/")), {
      senderName: auth.currentUser.displayName,
      senderId: auth.currentUser.uid,
      receiverName: item.username,
      receiverId: item.id,
    }).then(() => {
      // console.log("sent");
    });
  };

  // console.log(checkRequestId);

  return (
    <div className="max-w-2xl">
      <div className="p-4 max-w-md bg-white text-black rounded-lg border sm:p-8 border-gray-500 shadow-[0_4px_30px_rgba(147,51,234,0.6)] ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none">User List</h3>
          <a href="#" className="font-bold text-xl text-black">
            <HiDotsVertical />
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-700 h-[300px] overflow-y-scroll "
          >
            {userList.map((item) => {
              return (
                <li className="py-3 mb-2 sm:py-4 hover:bg-black hover:text-white rounded-md px-3 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-9 h-9 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md font-medium truncate">
                        {item.username}
                      </p>
                      <p className="text-md text-gray-400 truncate">
                        {item.email}
                      </p>
                    </div>
                    {checkFriendId.includes(auth.currentUser.uid + item.id) ||
                    checkFriendId.includes(item.id + auth.currentUser.uid) ? (
                      <button className="text-lg">Friend</button>
                    ) : checkRequestId.includes(
                        auth.currentUser.uid + item.id
                      ) ||
                      checkRequestId.includes(
                        item.id + auth.currentUser.uid
                      ) ? (
                      <button className="text-lg">Requested</button>
                    ) : (
                      <div
                        onClick={() => handleFriendRequest(item)}
                        className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white p-1.5 rounded-md cursor-pointer"
                      >
                        <FaPlus />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
