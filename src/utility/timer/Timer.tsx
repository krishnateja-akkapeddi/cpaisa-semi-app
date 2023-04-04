import React, {useState} from 'react';

const useTimer = (initialMaxTime = 0) => {
  const [maxTime, setMaxTime] = useState(initialMaxTime);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function addMinutes(date: Date, min?: number) {
    if (min) return new Date(date.getTime() + min * 60000);
  }

  const getDeadline = () => addMinutes(new Date(), maxTime);

  const getTime = (deadline: any) => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  React.useEffect(() => {
    const deadline = getDeadline();
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, [maxTime]);

  return {seconds, minutes, hours, days, setMaxTime, maxTime};
};

export default useTimer;
