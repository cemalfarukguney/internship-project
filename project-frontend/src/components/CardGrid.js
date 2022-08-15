import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "./Card";
import { UserContext } from "../context/UserContext";

let gameState = "";
let voters = [];
let doneVoters = [];

export function updateVoterState(votersResponse, doneVotersResponse) {
  voters = votersResponse;
  doneVoters = doneVotersResponse;
  console.log("VOTERS: " + voters);
  console.log("DONE VOTERS: " + doneVoters);
}

function CardGrid() {
  const [selectedCard, setSelectedCard] = useState(-1);
  const [{ username, setUsername }] = useContext(UserContext);
  const [voterState, setVoterState] = useState([]);
  const [doneVoterState, setDoneVoterState] = useState([]);
  const { updated, setUpdated } = useContext(UserContext)[2];

  var cards = [
    <Card
      key="0"
      number={0}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="1"
      number={1}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="2"
      number={2}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="3"
      number={3}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="5"
      number={5}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="8"
      number={8}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="13"
      number={13}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="21"
      number={21}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="34"
      number={34}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="55"
      number={55}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="89"
      number={89}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
    <Card
      key="?"
      number={"?"}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
  ];

  async function someAsyncFnc() {
    await 1;
  }
  let isMounted = false;

  useEffect(() => {
    console.log("in useEffect");
    if (isMounted) {
      setVoterState(voters);
      setDoneVoterState(doneVoters);
      console.log("state changed ");
    }
  }, [updated]);

  return (
    <div className="cardgrid--wrapper">
      {(isMounted = true)}
      <h3 className="cardgrid--h3">Dear {username},</h3>
      <div>
        {voterState.map((voter) => (
          <h3>{voter}</h3>
        ))}
        {/* <h3 className="cardgrid--h3">Please choose your cards!</h3> */}
        <h3 className="cardgrid--h3"></h3>
      </div>
      <div className="cardgrid--div">{cards}</div>
      <div className="reveal-button--div">
        {selectedCard !== -1 && <Button variant="primary">Reveal Cards</Button>}
      </div>
    </div>
  );
}

export default CardGrid;
