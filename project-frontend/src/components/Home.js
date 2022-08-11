import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateGameForm from "./CreateGameForm";
import { useState } from "react";
import ChangeUsernamePopup from "./ChangeUsernamePopup";

function Home() {
  const [createForm, setCreateForm] = useState(false);
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
        <Link to="/game">
          <Button type="primary" className="home--button">
            Join Game
          </Button>
        </Link>
        {createForm && <CreateGameForm />}
      </div>
      <ChangeUsernamePopup
        trigger={changeUsernamePopup}
        setTrigger={setChangeUsernamePopup}
      />
    </div>
  );
}

export default Home;
