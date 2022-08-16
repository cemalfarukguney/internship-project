import React from "react";

function Card(props) {
  return (
    <div className="card--div">
      {props.selectedNo !== props.number && (
        <button
          className="card--div-button"
          onClick={() => {
            props.selectCard(props.number);
            props.onClick(props.number);
          }}
        >
          {props.number}
        </button>
      )}
      {props.selectedNo === props.number && (
        <button
          className="card--div-button-selected"
          onClick={() => {
            props.selectCard(props.number);
            props.onClick(props.number);
          }}
        >
          {props.number}
        </button>
      )}
    </div>
  );
}

export default Card;
