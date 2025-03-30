import React from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

interface CountdownTimerProps {
  targetDate: string;
  eventTime?: string;
}

interface CountdownTimeProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  eventTime,
}) => {
  const dateTimeString = eventTime
    ? `${targetDate}T${eventTime}`
    : `${targetDate}T00:00:00`;
  const targetDateTime = new Date(dateTimeString).getTime();

  const currentDate = new Date().getTime();
  if (targetDateTime < currentDate) {
    return (
      <div className="text-xl font-bold text-yellow-400">
        O evento já ocorreu.
      </div>
    );
  }

  const renderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownTimeProps) => {
    if (completed) {
      return (
        <div className="text-2xl font-bold text-green-500">
          O evento está acontecendo agora!
        </div>
      );
    }

    return (
      <div className="flex justify-center gap-4 text-center">
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm min-w-[80px]">
          <div className="text-4xl text-white font-bold">{days}</div>
          <div className="text-sm text-white">dia(s)</div>
        </div>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm min-w-[80px]">
          <div className="text-4xl font-bold text-white">{hours}</div>
          <div className="text-sm text-white">horas</div>
        </div>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm min-w-[80px]">
          <div className="text-4xl font-bold text-white">{minutes}</div>
          <div className="text-sm text-white">minutos</div>
        </div>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm min-w-[80px]">
          <div className="text-4xl font-bold text-white">{seconds}</div>
          <div className="text-sm text-white">segundos</div>
        </div>
      </div>
    );
  };

  return <Countdown date={targetDateTime} renderer={renderer} />;
};

export default CountdownTimer;
