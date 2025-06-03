"use client";

import CountUp from "react-countup";

export default function CountUpWrapper({ end, duration, start }: any) {
  return <CountUp start={start} duration={duration} end={end} />;
}
