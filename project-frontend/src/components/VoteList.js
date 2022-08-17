import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import RevealCard from "./RevealCard";
let issuePoint;

export function updateIssuePoint(newIssuePoint) {
  issuePoint = newIssuePoint;
}

function VoteList() {
  var total = 0;
  var userNumber = 0;
  const [issuePointState, setIssuePointState] = useState();
  const { updated, setUpdated } = useContext(UserContext)[2];

  let isMounted;
  useEffect(() => {
    if (isMounted) {
      setIssuePointState(issuePoint);
    }
  }, [updated]);

  return (
    <div>
      {(isMounted = true)}
      <div className="cardgrid--div">
        {issuePoint?.map((data) => {
          data.point !== -1 && data.point !== "?"
            ? (total = total + data.point)
            : (total = total);
          data.point !== -1 && data.point !== "?"
            ? userNumber++
            : (userNumber = userNumber);
        })}
        {issuePoint?.map((data) => (
          <RevealCard username={data.user.name} selectedNo={data.point} />
        ))}
      </div>
      <div className="cardgrid--div">
        <h3 className="average--h3">
          average storypoint = {total / userNumber}
        </h3>
      </div>
    </div>
  );
}

export default VoteList;
