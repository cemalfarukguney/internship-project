import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "./Card";
import { UserContext } from "../UserContext";

function CardGrid(props) {
  const [selectedCard, setSelectedCard] = useState(-1);
  const [{ username, setUsername }] = useContext(UserContext);
  var cards = [
    <Card key="0" number={0} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="1"number={1} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="2"number={2} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="3"number={3} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="5"number={5} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="8"number={8} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="13"number={13} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="21"number={21} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="34"number={34} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="55"number={55} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card key="89"number={89} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card
      key="?"
      number={"?"}
      selectCard={setSelectedCard}
      selectedNo={selectedCard}
    />,
  ];

  return (
    <div className="cardgrid--wrapper">
      <h3 className="cardgrid--h3">Dear {username},</h3>
      <div>
        <h3 className="cardgrid--h3">Please choose your cards!</h3>
      </div>
      <div className="cardgrid--div">{cards}</div>
      <div className="reveal-button--div">
        {selectedCard !== -1 && <Button variant="primary">Reveal Cards</Button>}
      </div>
    </div>
  );
}

export default CardGrid;
