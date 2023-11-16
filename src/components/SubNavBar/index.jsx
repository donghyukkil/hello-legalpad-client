import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";

import useSignInWithGoogle from "../../hooks/useSignInWithGoogle";

import useStore from "../../useStore";

import { CONFIG } from "../../constants/config";

import { fetchUserRooms } from "../../utils/helpers";

const SubNavBar = () => {
  const { user, clearUser, rooms, setRooms, setRoomId, roomId } = useStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const signInWithGoogle = useSignInWithGoogle();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRoomClick = roomId => {
    if (roomId === "room1") {
      navigate("/chat");
    } else {
      navigate(`/room/${roomId}`);
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

      clearUser();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await fetchUserRooms(user);
        setRooms(roomsData);
      } catch (error) {
        console.error("fetchUserRooms failed:", error);
      }
    };

    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div
      className="h-16 flex justify-between relative w-full"
      style={{ backgroundColor: "#DAC0A3" }}
    >
      <div className="flex space-x-10 m-auto ml-20">
        <select
          onChange={e => {
            const selectedRoomId = e.target.value;
            setRoomId(selectedRoomId);
            handleRoomClick(selectedRoomId);
          }}
          value={roomId || ""}
          className="p-2 border rounded"
          style={{ width: "200px" }}
        >
          <option key="default-option" value="" disabled>
            select a room
          </option>
          {rooms?.map((room, index) => (
            <option key={index} value={room.roomId}>
              {room.roomName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mr-20 my-2">
        {user ? (
          <div style={{ width: "48px", height: "48px" }}>
            <Button>
              <img
                className="h-12 w-12 rounded-full"
                src={user.photoURL}
                alt="profile"
                onClick={toggleMenu}
              />
            </Button>
            {menuOpen && (
              <div className="bg-white">
                <Button
                  style={
                    "bg-white hover:border-0 hover:bg-gray-100 text-black rounded-md text-center text-lg font-semibold font-mono w-20 mt-2"
                  }
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button
            style={
              "bg-white hover:bg-gray-100 hover:border-0 text-black ml-3 rounded-lg font-semibold font-mono h-10 text-lg mt-1"
            }
            onClick={signInWithGoogle}
          >
            로그인
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubNavBar;
