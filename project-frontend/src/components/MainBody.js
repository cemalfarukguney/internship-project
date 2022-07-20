import React from "react";
import TaskList from "./TaskList";

export default function MainBody(){
    return(
        <div className="main--div">
            PICK YOUR CARDS
            <div>
                <TaskList />
            </div>
        </div>
    );
}