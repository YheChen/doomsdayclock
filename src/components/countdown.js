import { useState, useEffect } from "react";

const Countdown = ({ className, examDate }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = examDate - now;

      if (timeDifference < 0) {
        setTimeLeft("Event has started!");
        clearInterval(interval);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examDate, isClient]);

  if (!isClient) return null; // Prevent rendering on the server side

  return (
    <div>
      <h2>Countdown to {className} Event:</h2>
      <p>{timeLeft}</p>
    </div>
  );
};

export default Countdown;
