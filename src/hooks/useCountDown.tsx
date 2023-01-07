import { useState, useEffect } from "react";

const useCountDown = (
  timeLeftToAnswerQuestion: number
): [number, () => void] => {
  const [startTime, setStartTime] = useState<number>(new Date().getTime());
  const [countdownTimeLeft, setCountdownTimeLeft] = useState<number>(
    timeLeftToAnswerQuestion / 1000
  );

  function resetCountdown() {
    const newStartTime = new Date().getTime();
    setStartTime(newStartTime);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTimeLeft(
        //the timer won't go below 0 due to Math.max()
        Math.max(
          Math.floor(
            (timeLeftToAnswerQuestion - (new Date().getTime() - startTime)) /
              1000
          ),
          0
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  return [countdownTimeLeft, resetCountdown];
};

export default useCountDown;
