import { useEffect, useState } from "react"

type Props = {
  initialTime: Date;
};

const formatTime = (time: Date): string => {
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export const Clock = ({ initialTime }: Props) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setSeconds(prevDate.getSeconds() + 1);
        return newDate;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return <span>{formatTime(time)}</span>;
}