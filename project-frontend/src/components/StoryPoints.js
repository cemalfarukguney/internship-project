import React, { useMemo, useContext } from "react";
import TaskListContext from "../context/TaskListContext";

const INT_REGEX = /^\d+$/;

function StoryPoints(props) {

  const total = useMemo(
    () =>
      props.tasks.reduce((acc, task) => {
        const isIntString =
          task.storyPoint.toString().match(INT_REGEX) !== null;

        if (isIntString) {
          return acc + Number(task.storyPoint);
        }

        return acc;
      }, 0),
    [props.tasks]
  );

  return <>{total} points</>;
}

export default StoryPoints;
