import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "./Card";
import { UserContext } from "../UserContext";

function CardGrid(props) {
  const [selectedCard, setSelectedCard] = useState(-1);
  const [{ username, setUsername }] = useContext(UserContext);
  var cards = [
    <Card number={0} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={1} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={2} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={3} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={5} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={8} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={13} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={21} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={34} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={55} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card number={89} selectCard={setSelectedCard} selectedNo={selectedCard} />,
    <Card
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
