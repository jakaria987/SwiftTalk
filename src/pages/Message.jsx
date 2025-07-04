import React, { useEffect, useState } from "react";
import FriendChatList from "./FriendChatList";
import { useSelector } from "react-redux";
import { FaPaperPlane } from "react-icons/fa";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import moment from "moment";
const Message = () => {
  const db = getDatabase();
  let [msg, setMsg] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const user = useSelector((state) => state.chatInfo.value);
  let handleMsg = (e) => {
    setMsg(e.target.value);
  };
  let handleSendMsg = () => {
    set(push(ref(db, "chatList/")), {
      senderName: auth.currentUser.displayName,
      senderId: auth.currentUser.uid,
      receiverName: user?.name,
      receiverId: user?.id,
      msg: msg,
      date: `${new Date().getFullYear()} / ${
        new Date().getMonth() + 1
      } / ${new Date().getDate()} / ${new Date().getHours()} / ${new Date().getMinutes()}`,
    }).then(() => {
      toast.success("message sent");
      setMsg("");
    });
  };

  useEffect(() => {
    const requestListRef = ref(db, "chatList/");
    onValue(requestListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          (auth.currentUser.uid == item.val().receiverId &&
            user?.id == item.val().senderId) ||
          (auth.currentUser.uid == item.val().senderId &&
            user?.id == item.val().receiverId)
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setMsgList(array);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // console.log(msgList);

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className="container mx-auto shadow-lg rounded-lg">
        {/* header */}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <Toaster position="top-center" reverseOrder={true} />
          <div className="font-bold text-2xl">SwiftTalk</div>
          <div className="w-1/2">
            <input
              type="text"
              name=""
              id=""
              placeholder="search IRL"
              className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
            />
          </div>
          {user && (
            <h1 className="text-xl bg-black text-gray-300 py-2 px-2 rounded-md">
              Chat with {user?.name}
            </h1>
          )}
        </div>
        {/* end header */}
        {/* Chatting */}
        <div className="flex flex-row justify-between bg-white">
          {/* chat list */}
          <FriendChatList></FriendChatList>
          {/* end chat list */}
          {/* message */}
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              {msgList.map((msgItem) =>
                msgItem.senderId == auth.currentUser.uid ? (
                  <div className="flex justify-end mb-4">
                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      <h2>{msgItem.msg}</h2>
                      <h6>
                        {moment(msgItem.date, "YYYYMMDD h:mm:ss").fromNow()}
                      </h6>
                    </div>
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                      <h2>{msgItem.msg}</h2>
                      <h6>
                        {moment(msgItem.date, "YYYYMMDD h:mm:ss").fromNow()}
                      </h6>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="py-5 flex items-center gap-4 ">
              {user && (
                <input
                  onChange={handleMsg}
                  className="w-11/12 bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="type your message here..."
                  value={msg}
                />
              )}
              {user && (
                <FaPaperPlane
                  onClick={handleSendMsg}
                  className="icon hover:cursor-pointer "
                />
              )}
            </div>
          </div>
          {/* end message */}
          <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
                alt=""
              />
              <div className="font-semibold py-4">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, perspiciatis!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
