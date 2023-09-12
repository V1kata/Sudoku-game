import { useState } from "react";

export function useSelectedDigit() {
  const [selectedDigit, setSelectedDigit] = useState(null);

  const handleSelectedDigit = (e) => {
    const target = e.target;

    if (selectedDigit != null) {
      selectedDigit.classList.remove("number-selected");
      setSelectedDigit(null);
    }

    target.classList.add("number-selected");
    setSelectedDigit(target);
  };

  return { selectedDigit, handleSelectedDigit };
}
