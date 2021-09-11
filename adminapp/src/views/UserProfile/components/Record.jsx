import React from "react";

export default function Record({ record }) {
  return (
    <div>
      {Object.entries(record).map((key, value) => (
        <p>
          {key}: {value}
        </p>
      ))}
    </div>
  );
}
