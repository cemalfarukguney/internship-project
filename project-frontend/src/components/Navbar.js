import React, { useCallback, useContext } from "react";
import { MdTask, MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import SettingsPopup from "./SettingsPopup";
import HistoryPopup from "./HistoryPopup";
import InvitationPopup from "./InvitationPopup";
import { UserContext } from "../context/UserContext";
import ChangeUsernamePopup from "./ChangeUsernamePopup";

export default function Navbar(props) {
  const [{ username, setUsername }, { roomName, setRoomName }] =
    useContext(UserContext);
  const [isShown, setIsShown] = useState(false);

  const handleClick = useCallback((event) => {
    setIsShown((current) => {
      const newIsShown = !current;

      props.parentCallback(newIsShown);

      return newIsShown;
    });
  });

  const [settingsPopup, setSettingsPopup] = useState(false);

  const settingsClick = (event) => {
    setSettingsPopup((current) => !current);
  };

  const [historyPopup, setHistoryPopup] = useState(false);

  const historyClick = (event) => {
    setHistoryPopup((current) => !current);
  };

  const [invitationPopup, setInvitationPopup] = useState(false);

  const invitationClick = (event) => {
    setInvitationPopup((current) => !current);
  };

  const [changeUsernamePopup, setChangeUsernamePopup] = useState(false);

  const changeUsernameClick = (event) => {
    setChangeUsernamePopup((current) => !current);
  };

  return (
    <nav className="navbar--div">
      <a href="/">
        <img
          alt=""
          className="navbar--logo"
          src="https://logos-world.net/wp-content/uploads/2021/03/Yapi-Kredi-Emblem.png"
        />
      </a>
      <div className="navbar--dropdown-room">
        <button className="navbar--dropdown-room-button">
          {roomName} <MdKeyboardArrowDown />{" "}
        </button>
        <div className="navbar--dropdown-room-content">
          <button onClick={settingsClick}>Game Settings</button>
          <button onClick={historyClick}>Voting History</button>
        </div>
      </div>
      <div className="navbar--empty"></div>
      <div className="navbar--dropdown-user">
        <button className="navbar--dropdown-user-button">
          {username} <MdKeyboardArrowDown />{" "}
        </button>
        <div className="navbar--dropdown-user-content">
          <button onClick={changeUsernameClick}>Change Username</button>
        </div>
      </div>
      <button className="navbar--invite-button" onClick={invitationClick}>
        Invite colleagues <IoPersonAdd />
      </button>
      <button className="navbar--tasks-button" onClick={handleClick}>
        <MdTask />
      </button>
      <SettingsPopup trigger={settingsPopup} setTrigger={setSettingsPopup} />
      <HistoryPopup trigger={historyPopup} setTrigger={setHistoryPopup} />
      <InvitationPopup
        trigger={invitationPopup}
        setTrigger={setInvitationPopup}
      />
      <ChangeUsernamePopup
        trigger={changeUsernamePopup}
        setTrigger={setChangeUsernamePopup}
      />
    </nav>
  );
}
