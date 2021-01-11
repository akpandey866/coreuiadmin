import React, { useEffect, useState } from "react";
import { formateDate } from "../helpers/commonHelpers";
var Interval;
export default function Countdown({
  counter,
  onFinish,
  style = "timer",
  serverTime = new Date(),
}) {
  const [value, setValue] = useState(counter);
  useEffect(() => {
    Interval = setInterval(() => {
      //let days = Math.floor(Math.abs(counter / (60 * 60 * 24)));
      let hours = Math.floor(counter / (60 * 60));
      let minutes = Math.floor((counter / 60) % 60);
      let seconds = Math.floor(counter % 60);
      //days = days < 10 ? "0" + days : days;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // var d = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      // console.log(d);
      // if (days > 1) {
      //   return moment(countDownDate).format("DD/MM/YYYY");
      // } else if (days == 1 && days > 0) {
      //   return "yesterday";
      // } else if (hours > 0) {
      //   return Math.abs(hours) + "hours ago";
      // } else if (hours == 0 && minutes > 0) {
      //   return Math.abs(minutes) + "minutes ago";
      // } else if (minutes == 0 && seconds > 10) {
      //   return Math.abs(seconds) + "seconds ago";
      // } else {
      //   return "now";
      // }
      let d = new Date(serverTime);
      d.setSeconds(counter ? +counter : 0);
      let value =
        hours > 72
          ? formateDate(d, "DD MMM, YYYY")
          : hours >= 0 || minutes >= 0 || seconds >= 0
          ? hours + "h " + minutes + "m " + seconds + "s"
          : "00h:00m:00s";
      setValue(value);
      if (--counter < 0) {
        onFinish();
      }
    }, 990);
    return () => {
      clearInterval(Interval);
    };
  }, [counter]);
  return <span>{value}</span>;
}
