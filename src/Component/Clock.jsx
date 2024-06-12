import React, { useState, useEffect } from 'react';
import '../Clock/Colors.css'; // Import CSS file

const Clock = ({ clock, onMessage }) => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const now = new Date().getTime();
    const initialTime = clock ? clock * 1000 :60 * 60 * 1000; // Convert clock from seconds to milliseconds
    const targetTime = now + initialTime; // Set the target time based on initialTime

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.floor((targetTime - currentTime) / 1000);
      onMessage(remainingTime);
      
      if (remainingTime <= 0) {
        clearInterval(timer);
        setTime({
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      } else {
        const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = Math.floor(remainingTime % 60);

        setTime({
          hours: formatTime(hours),
          minutes: formatTime(minutes),
          seconds: formatTime(seconds)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [clock]); // Add clock as a dependency to useEffect

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="wrapper">
      <div className="timer flex space-x-2">
        <div className="sub_timer">
          <h1 id="hour" className="digit">{time.hours} :</h1>
        </div>
        <div className="sub_timer">
          <h1 id="min" className="digit">{time.minutes} :</h1>
        </div>
        <div className="sub_timer">
          <h1 id="sec" className="digit">{time.seconds}</h1>
        </div>
      </div>
    </div>
  );
};

export default Clock;
