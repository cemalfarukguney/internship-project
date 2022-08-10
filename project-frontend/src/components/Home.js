import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateGameForm from "./CreateGameForm";
import { useState } from "react";

function Home() {
  const [createForm, setCreateForm] = useState(false);
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
    </div>
  );
}

export default Home;
