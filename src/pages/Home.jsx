import React, { useEffect } from "react";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "../reduxSlice/UserSlice";

const Home = () => {
  // const navigate = useNavigate();
  const data = useSelector((state) => state.userLogin.value);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userLoginInfo({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(userLoginInfo(null));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // console.log(auth)
  // useEffect(() => {
  //   if (!data) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  return (
    <>
      {/* {data.displayName && (
        <h1 className="my-4 bg-black text-white p-2 inline-block rounded-md">
          Hello, {data.displayName} welcome to SwiftTalk
        </h1>
      )} */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
      </div>
    </>
  );
};

export default Home;
