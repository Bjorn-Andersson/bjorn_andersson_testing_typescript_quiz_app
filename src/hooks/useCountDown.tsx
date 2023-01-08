import { useState, useEffect } from "react";

const useCountDown = (targetSeconds: number): [number, () => void] => {
  const [startTime, setStartTime] = useState<number>(new Date().getTime());
  const [countdownTimeLeft, setCountdownTimeLeft] = useState<number>(
    targetSeconds / 1000
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
            (targetSeconds - (new Date().getTime() - startTime)) / 1000
          ),
          0
        )
      );
    }, 100);

    return () => clearInterval(interval);
  });

  return [countdownTimeLeft, resetCountdown];
};

export default useCountDown;
