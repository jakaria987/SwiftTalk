import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { useDispatch } from "react-redux";
import { chattingUser } from "../reduxSlice/chatSlice";

const FriendChatList = () => {
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);
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
      setChatList(array);
    });
  }, []);
  //   console.log(chatList);

  let handleIndividualUser = (item) => {
    
    if (auth.currentUser.uid == item.senderId) {
      dispatch(chattingUser({ name: item.receiverName, id: item.receiverId }));
      console.log(item, "ricever")
    } else {
      dispatch(chattingUser({ name: item.senderName, id: item.senderId }));
      console.log(item, "sender")
    }
  };

  return (
    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
      {/* search compt */}
      <div className="border-b-2 py-4 px-2">
        <input
          type="text"
          placeholder="search chatting"
          className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
        />
      </div>
      {/* end search compt */}
      {/* user list */}
      {chatList.map((item) => (
        <div
          onClick={() => handleIndividualUser(item)}
          className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
        >
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            {auth.currentUser.uid == item.senderId ? (
              <div className="text-lg font-semibold">{item.receiverName}</div>
            ) : (
              <div className="text-lg font-semibold">{item.senderName}</div>
            )}
            <span className="text-gray-500">Pick me at 9:00 Am</span>
          </div>
        </div>
      ))}

      {/* end user list */}
    </div>
  );
};

export default FriendChatList;
