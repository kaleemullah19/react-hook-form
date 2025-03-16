import React from "react";

export const GetRenderCount = () => {
  let count = 0;

  return () => {
    count++;
    return <div>render count {count / 2}</div>;
  };
};
