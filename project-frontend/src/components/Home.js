import React from "react";
import CreateGameForm from "./CreateGameForm";
import { useState } from "react";
import ChangeUsernamePopup from "./ChangeUsernamePopup";
import JoinGameForm from "./JoinGameForm";

function Home() {
  const [changeUsernamePopup, setChangeUsernamePopup] = useState(true);

  const changeUsernameClick = (event) => {
    setChangeUsernamePopup((current) => !current);
  };
  return (
    <div className="home--div">
      <div className="home-create--div">
        <CreateGameForm />
      </div>
      <div className="home-join--div">
        <JoinGameForm />
      </div>
      <ChangeUsernamePopup
        trigger={changeUsernamePopup}
        setTrigger={setChangeUsernamePopup}
      />
    </div>
  );
}

export default Home;
