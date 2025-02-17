import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const jsValue = localStorage.getItem(key);
      if (jsValue != null) return JSON.parse(jsValue);

      if (typeof initialValue === "function") {
        return initialValue();
      } else {
        return initialValue;
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  });

  return [storedValue, setStoredValue];
}
