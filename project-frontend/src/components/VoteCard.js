import React from "react";

function VoteCard(props) {
  return (
    <div className="card--div">
      {props.selected !== false && (
        <h4 className="votecard--div">
          {props.username}
          <br></br>voted!
        </h4>
      )}
      {props.selected === false && (
        <h4 className="votecard--div-selected">
          {props.username}
          <br></br> didn't vote!
        </h4>
      )}
    </div>
  );
}

export default VoteCard;
