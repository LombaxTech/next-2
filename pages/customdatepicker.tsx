import { useState, useEffect } from "react";
import { add, format } from "date-fns";
import { setInterval } from "timers/promises";

export default function () {
  const [dates, setDates] = useState([]);

  async function init() {
    let dates = [];

    let today = new Date();
    dates.push(format(today, "yyyy-MM-dd"));

    let i = 1;
    while (i < 15) {
      //   console.log(i);
      let newDate = add(today, { days: i });
      dates.push(format(newDate, "yyyy-MM-dd"));
      i++;
    }

    setDates(dates);
  }

  useState(() => {
    init();
  }, []);

  return (
    <div>
      helo
      <button onClick={() => console.log(dates)}>see dates</button>
    </div>
  );
}
