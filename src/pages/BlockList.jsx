import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { auth } from "../firebase.config";

const BlockList = () => {
  const [blockList, setBlockList] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const requestListRef = ref(db, "blockList/");
    onValue(requestListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().blockByUserId) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setBlockList(array);
    });
  }, []);
  // console.log(requestList);
  const handleUnblock = (item) => {
    if (auth.currentUser.uid == item.blockByUserId) {
      set(push(ref(db, "friendList/")), {
        senderId: item.blockByUserId,
        senderName: item.blockByUserName,
        receiverId: item.blockedToUserId,
        receiverName: item.blockedToUserName,
      }).then(() => {
        remove(ref(db, "blockList/" + item.id));
      });
    } else {
      set(push(ref(db, "friendList/")), {
        senderId: item.blockedToUserId,
        senderName: item.blockedToUserName,
        receiverId: item.blockByUserId,
        receiverName: item.blockByUserName,
      }).then(() => {
        remove(ref(db, "blockList/" + item.id));
      });
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="p-4 max-w-md bg-white text-black rounded-lg border sm:p-8 border-gray-500 shadow-[0_4px_30px_rgba(147,51,234,0.6)] ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none">Block List</h3>
          <a href="#" className="font-bold text-xl text-black">
            <HiDotsVertical />
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-700 h-[300px] overflow-y-scroll "
          >
            {blockList.map((item) => (
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
                    {auth.currentUser.uid == item.blockByUserId ? (
                      <p className="text-md font-medium truncate">
                        {item.blockedToUserName}
                      </p>
                    ) : (
                      <p className="text-md font-medium truncate">
                        {item.blockByUserName}
                      </p>
                    )}
                    <p className="text-md text-gray-400 truncate">nothing</p>
                  </div>
                  <div
                    onClick={() => handleUnblock(item)}
                    className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white px-2.5 py-1.5 rounded-md cursor-pointer"
                  >
                    Unblock
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockList;
