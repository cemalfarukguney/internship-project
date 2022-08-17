import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "./Card";
import { UserContext } from "../context/UserContext";
import VoteCard from "./VoteCard";
import RevealCard from "./RevealCard";
import axios from "axios";

let gameState = "";
let voters = [];
let doneVoters = [];

export function updateVoterState(doneVotersResponse) {
  doneVoters = doneVotersResponse;
  console.log("VOTERS: " + voters);
  console.log("DONE VOTERS: " + doneVoters.map((data) => data.userName));
}

function CardGrid(props) {
  const [selectedCard, setSelectedCard] = useState(-1);
  const [{ username, setUsername }] = useContext(UserContext);
  const [voterState, setVoterState] = useState([]);
  const [doneVoterState, setDoneVoterState] = useState();
  const { updated, setUpdated } = useContext(UserContext)[2];
  const { gameId, setGameId } = useContext(UserContext)[3];

  const storyPoints = [
    "0",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "21",
    "34",
    "55",
    "89",
    "?",
  ];

  async function addPointToIssue(gameId, issueId, userId, point) {
    await axios
      .post(
        `http://localhost:8080/addPoint/${gameId}/${issueId}/${userId}/${point}`,
        {}
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(
      `${userId} id'li kullanıcı ${issueId} id'li issue'ya ${point} puan verdi.`
    );
  }

  var cards = [];

  {
    storyPoints.map((storyPoint, index) => {
      cards.push(
        <Card
          key={index}
          number={storyPoint}
          selectCard={setSelectedCard}
          selectedNo={selectedCard}
          onClick={addPointToIssue}
        />
      );
    });
  }

  async function revealCard() {
    axios.get(`http://localhost:8080/revealCards/${gameId}`);
  }

  let isMounted = false;

  useEffect(() => {
    if (isMounted) {
      setDoneVoterState(doneVoters);
    }
  }, [updated]);

  async function revealCard() {
    axios.get(`http://localhost:8080/revealCards/${gameId}`);
  }

  return (
    <div className="cardgrid--wrapper">
      {(isMounted = true)}
      <div className="cardgrid--div">
        {doneVoterState?.map((voter) => (
          <VoteCard username={voter.userName} selected={voter.vote} />
        ))}
      </div>
      <h3 className="cardgrid--h3">Dear {username},</h3>
      <div>
        <h3 className="cardgrid--h3">Please choose your cards!</h3>
        <h3 className="cardgrid--h3"></h3>
      </div>
      <div className="cardgrid--div">{cards}</div>
      <div className="reveal-button--div">
        {selectedCard !== -1 && (
          <Button variant="primary" onClick={revealCard}>
            Reveal Cards
          </Button>
        )}
      </div>
    </div>
  );
}
export default CardGrid;
