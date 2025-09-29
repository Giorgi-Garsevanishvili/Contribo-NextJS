"use client";

import { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.log(`${error}`);
  }, [error]);

  return (
    <div>
      <div style={{ color: "red" }}>Error During fetching data</div>
    </div>
  );
}
