import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Swr() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:5050/api/data",
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false } // 👈 Add this
  );

  const [inputValue, setInputValue] = useState("");

  const handlePost = async () => {
    const newItem = { item: inputValue };

    // Optimistically update the UI
    mutate(
      async () => {
        await fetch("http://localhost:5050/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });

        // Re-fetch data after posting
        return { message: "Success", data: [...data.data, newItem.item] }; // ✅ Optimistically add new item
      },
      { revalidate: false }
    );

    setInputValue("");
  };

  if (error) return "An error has occurred. Please run the server on localhost";
  if (isLoading) return "Loading...";

  return (
    <div>
      <h1>{data?.message}</h1>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={handlePost}>Add Item</button>

      <ul>
        {data?.data?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
