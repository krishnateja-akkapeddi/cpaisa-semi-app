import React from 'react';
const useTimer = (maxTime?: number) => {
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  function addMinutes(date: Date, min?: number) {
    if (min) return new Date(date.getTime() + min * 60000);
  }
  const deadline: any = addMinutes(new Date(), maxTime);

  const getTime = (deadline: any) => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {}, [seconds]);
  return [seconds, minutes, hours, days];
};

export default useTimer;
