import React, { useMemo } from "react";

const INT_REGEX = /^\d+$/;

function StoryPoints({ tasks }) {
  const total = useMemo(
    () =>
      tasks.reduce((acc, task) => {
        const isIntString = task.storyPoint.toString().match(INT_REGEX) !== null;

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
