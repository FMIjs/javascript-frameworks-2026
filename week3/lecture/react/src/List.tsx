import { useEffect, useMemo, useState } from "react";

export function List() {
  const [arr, setArr] = useState(["One", "Two", "Three"]);
  const filteredItems = useMemo(
    () => arr.filter((a) => a.includes("a")),
    [arr],
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setArr((curr) => curr.concat("Four"));
    }, 5000);
    return () => clearTimeout(id);
  }, []);

  return (
    <ul>
      {arr.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
