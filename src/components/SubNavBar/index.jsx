import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import Button from "../Button";

import { CONFIG } from "../../constants/config";

const SubNavBar = ({ roomId, setRoomId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const userPhotoURL = localStorage.getItem("userPhotoURL");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userPhotoURL", user.photoURL);

      const authenticateUser = async () => {
        try {
          const response = await fetch(`${CONFIG.BACKEND_SERVER_URL}/users`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: user.email }),
          });

          if (response.ok) {
            console.log("인증 성공");
          } else {
            console.log("인증 실패", response);
          }
        } catch (error) {
          console.error(error.message);
        }
      };

      await authenticateUser();

      navigate("/create");
    } catch (error) {
      console.log("에러 발생");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_SERVER_URL}/users/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (response.ok) {
        console.log("로그아웃 성공");
      } else {
        console.error("로그아웃 실패");
      }

      localStorage.clear();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="mr-10 h-16 flex justify-end relative w-full"
      style={{ backgroundColor: "#DAC0A3" }}
    >
      {roomId && (
        <div className="m-4">
          <select
            onChange={e => setRoomId(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="" disabled>
              Select a room
            </option>
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
            <option value="room3">Room 3</option>
          </select>
        </div>
      )}
      <div className="flex flex-col mr-32 my-2">
        {userPhotoURL ? (
          <>
            <Button>
              <img
                className="h-12 w-12 rounded-full"
                src={userPhotoURL}
                alt="profile"
                onClick={toggleMenu}
              />
            </Button>
            {menuOpen && (
              <div className="bg-white absolute mt-16">
                <Button
                  style={
                    "bg-white hover:border-0 hover:bg-gray-100 text-black px-4 py-2 rounded-md text-center text-lg font-semibold font-mono"
                  }
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </div>
            )}
          </>
        ) : (
          <Button
            style={
              "bg-white hover:bg-gray-100 hover:border-0 text-black px-4 py-2 rounded-lg p-0 text-lg font-semibold font-mono"
            }
            onClick={signInWithGoogle}
          >
            구글 로그인
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubNavBar;
