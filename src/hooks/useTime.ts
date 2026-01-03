import { useState, useEffect } from "react";

export function useTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Set initial time to avoid hydration mismatch
    const updateTime = () => {
      const now = new Date();
      // Format: 21:05 WIB
      const timeString = now
        .toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
        .replace(".", ":"); // Fix separator Indo

      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
