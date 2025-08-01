import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { auth } from "../firebase.config";

const FriendList = () => {
  const [requestList, setRequestList] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const requestListRef = ref(db, "friendList/");
    onValue(requestListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverId ||
          auth.currentUser.uid == item.val().senderId
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setRequestList(array);
    });
  }, []);
  // console.log(requestList);
  const handleBlock = (item) => {
    if (auth.currentUser.uid == item.senderId) {
      console.log("receiver", item);
      set(push(ref(db, "blockList/")), {
        blockByUserId: item.senderId,
        blockByUserName: item.senderName,
        blockedToUserId: item.receiverId,
        blockedToUserName: item.receiverName,
      }).then(() => {
        remove(ref(db, "friendList/" + item.id));
      });
    } else {
      console.log("sender", item);
      set(push(ref(db, "blockList/")), {
        blockByUserId: item.receiverId,
        blockByUserName: item.receiverName,
        blockedToUserId: item.senderId,
        blockedToUserName: item.senderName,
      }).then(() => {
        remove(ref(db, "friendList/" + item.id));
      });
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="p-4 max-w-md bg-white text-black rounded-lg border sm:p-8 border-gray-500 shadow-[0_4px_30px_rgba(147,51,234,0.6)] ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none">Friend List</h3>
          <a href="#" className="font-bold text-xl text-black">
            <HiDotsVertical />
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-700 h-[300px] overflow-y-scroll "
          >
            {requestList.map((item) => (
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
                    {auth.currentUser.uid == item.senderId ? (
                      <p className="text-md font-medium truncate">
                        {item.receiverName}
                      </p>
                    ) : (
                      <p className="text-md font-medium truncate">
                        {item.senderName}
                      </p>
                    )}
                    <p className="text-md text-gray-400 truncate">nothing</p>
                  </div>
                  <div
                    onClick={() => handleBlock(item)}
                    className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white px-2.5 py-1.5 rounded-md cursor-pointer"
                  >
                    Block
                  </div>
                  {/* <div className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white px-2.5 py-1.5 rounded-md cursor-pointer">
                    Accept
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
