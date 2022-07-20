import React from "react";

export default function Navbar(){

    return (
        <nav className="navbar--div">
            <img className="navbar--logo" src="logo192.png" />
            <div className="navbar--dropdown-room">
                <button className="navbar--dropdown-room-button">Room Name</button>
                <div className="navbar--dropdown-room-content">
                    <a href="#">Game Settings</a>
                    <a href="#">Voting History</a>
                </div>
            </div>
            <div className="navbar--empty"></div>
            <div className="navbar--dropdown-user">
                <button className="navbar--dropdown-user-button">Username</button>
                <div className="navbar--dropdown-user-content">
                    <a href="#">Link1</a>
                    <a href="#">Link2</a>
                    <a href="#">Link3</a>
                </div>
            </div>
            <button className="navbar--invite-button">Invite friends</button>
            <button className="navbar--tasks-button">A</button>
        </nav>
    );
}