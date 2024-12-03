import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const ClockTimeContext = createContext(new Date());

export const ClockTimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [timer, setTimer] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setSeconds(prevDate.getSeconds() + 1);
        return newDate;
      })
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <ClockTimeContext.Provider value={timer} >
      {children}
    </ClockTimeContext.Provider>
  );
};

export const useCurrentClockTime = () => {
  return useContext(ClockTimeContext);
};
