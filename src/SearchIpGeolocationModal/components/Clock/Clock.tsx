import styles from "./Clock.module.css";
import { useCurrentClockTime } from "../../../ClockTimeContext";

type Props = {
  timeZone: string;
};

const formatTime = (time: Date, timeZone: string): string => {
  const timeInTimeZone = new Date(time.toLocaleString("en-US", { timeZone }))
  const hours = String(timeInTimeZone.getHours()).padStart(2, '0');
  const minutes = String(timeInTimeZone.getMinutes()).padStart(2, '0');
  const seconds = String(timeInTimeZone.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export const Clock = ({ timeZone }: Props) => {
  const time = useCurrentClockTime();

  return <span className={styles.container}>{formatTime(time, timeZone)}</span>;
}