import React from "react";
import {MdTask, MdKeyboardArrowDown} from 'react-icons/md';
import {useState} from 'react';
import {IoPersonAdd} from 'react-icons/io5'
import SettingsPopup from "./SettingsPopup";
import HistoryPopup from "./HistoryPopup";

export default function Navbar(props){

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        setIsShown(current => !current);
        props.parentCallback(isShown);
        console.log(isShown);
    };

    const [settingsPopup, setSettingsPopup] = useState(false);

    const settingsClick = event => {
        setSettingsPopup(current => !current);
    };
    
    const [historyPopup, setHistoryPopup] = useState(false);

    const historyClick = event => {
        setHistoryPopup(current => !current);
    };

    return (
        <nav className="navbar--div">
             <a href="">
                <img className="navbar--logo" src="https://logos-world.net/wp-content/uploads/2021/03/Yapi-Kredi-Emblem.png" />
            </a> 
            <div className="navbar--dropdown-room">
                <button className="navbar--dropdown-room-button">{props.roomName} <MdKeyboardArrowDown /> </button>
                <div className="navbar--dropdown-room-content">
                    <a href="#" onClick={settingsClick}>Game Settings</a>
                    <a href="#" onClick={historyClick}>Voting History</a>
                </div>
            </div>
            <div className="navbar--empty"></div>
            <div className="navbar--dropdown-user">
                <button className="navbar--dropdown-user-button">{props.username} <MdKeyboardArrowDown /> </button>
                <div className="navbar--dropdown-user-content">
                    <a href="#">Link1</a>
                    <a href="#">Link2</a>
                    <a href="#">Link3</a>
                </div>
            </div>
            <button className="navbar--invite-button">Invite colleagues <IoPersonAdd/></button>
            <button className="navbar--tasks-button" onClick={handleClick}>
                <MdTask />
            </button>
            <SettingsPopup trigger={settingsPopup} roomName={props.roomName} setTrigger={setSettingsPopup}/>
            <HistoryPopup trigger={historyPopup} setTrigger={setHistoryPopup}/>
        </nav>
    );
}