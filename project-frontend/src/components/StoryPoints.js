import React, { useMemo, useContext } from "react";
import TaskListContext from "../context/TaskListContext";

const INT_REGEX = /^\d+$/;

function StoryPoints() {
  const { tasks, setTasks } = useContext(TaskListContext)[0];

  const total = useMemo(
    () =>
      tasks.reduce((acc, task) => {
        const isIntString =
          task.storyPoint.toString().match(INT_REGEX) !== null;

        if (isIntString) {
          return acc + Number(task.storyPoint);
        }

        return acc;
      }, 0),
    [tasks]
  );

  return <>{total} points</>;
}

export default StoryPoints;
