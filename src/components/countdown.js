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

  if (!isClient) return null;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 text-center max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{className}:</h2>
      <p className="text-2xl font-bold text-red-600">{timeLeft}</p>
    </div>
  );
};

export default Countdown;
