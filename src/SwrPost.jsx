import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

const postFetcher = async (url, { arg }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  return res.json();
};

export default function SwrPost() {
  const { trigger, data, isMutating } = useSWRMutation(
    "http://localhost:5050/api/echo",
    postFetcher
  );

  const [inputData, setInputData] = useState("");

  return (
    <div>
      <h2>SWR POST Example</h2>
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter some text"
      />
      <button
        onClick={() => trigger({ userInput: inputData })}
        disabled={isMutating}
      >
        Send
      </button>

      {isMutating && <p>Sending...</p>}
      {data && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
