import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const useCountDown = (props: {unixTime: number}) => {
  const [timeLeft, setTimeLeft] = useState(props.unixTime - Date.now() / 1000);
  const [countdownStopped, setCountdownStopped] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(Math.ceil(props.unixTime - Date.now() / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft < 0) {
      setCountdownStopped(true);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  if (countdownStopped) {
    return [-1, -1];
  }

  return [minutes, seconds];
};

export default useCountDown;
