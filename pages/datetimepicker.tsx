import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { useEffect, forwardRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { addHours } from "date-fns";

import { Spinner } from "@chakra-ui/react";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const BACKEND = "http://localhost:5000";

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    className="example-custom-input bg-blue-400 text-white px-6 py-2 rounded-md"
    onClick={onClick}
    ref={ref}
  >
    Book A Lesson
  </button>
));

export default function DateTimePicker() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [authUser, authUserLoading, error] = useAuthState(auth);
  const [firestoreUser, setFirestoreUser] = useState(null);

  const [bookings, setBookings] = useState([]);

  async function init() {
    if (!authUserLoading && authUser) {
      try {
        onSnapshot(doc(db, "users", authUser.uid), (userDoc) =>
          setFirestoreUser(userDoc.data())
        );

        onSnapshot(collection(db, "bookings"), (bookingsSnapshot) => {
          let bookings = [];

          bookingsSnapshot.forEach((bookingDoc) => {
            // console.log(bookingDoc.data().bookingTime.toDate());

            const bookingTime = bookingDoc.data().bookingTime.toDate();
            // console.log(bookingTime);

            let booking = {
              ...bookingDoc.data(),
              id: bookingDoc.id,
              bookingTime,
            };

            bookings.push(booking);
            bookings.sort((a, b) => a.bookingTime - b.bookingTime);
          });
          setBookings(bookings);
          //   console.log(bookingsSnapshot.size);
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    init();
  }, [authUser, authUserLoading]);

  const [startDate, setStartDate] = useState(new Date());
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  const isWeekday = (date) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6;
  };

  const filterDate = (date) => {
    const day = dayjs(date).day();

    if (day == 0 || day == 6) return false;

    return true;
  };

  const createBooking = async () => {
    try {
      // TODO: Create meeting on googl calendar and get link
      const startTime = startDate;
      const endTime = addHours(startDate, 1);
      let res = await axios.post(`${BACKEND}/create-calendar-event`, {
        startTime,
        endTime,
        refresh_token: firestoreUser.refresh_token,
      });

      let googleMeetLink = res.data.data.hangoutLink;

      console.log("success");
      console.log(res);
      // console.log(startDate);
      // console.log(addHours(startDate, 1));

      // return;
      // console.log(dayjs(startDate).day());
      const bookingInfo = {
        users: [authUser.uid],
        bookingTime: startDate,
        googleMeetLink,
      };
      const bookingsCollection = collection(db, "bookings");
      const bookingRef = await addDoc(bookingsCollection, bookingInfo);
      console.log(bookingRef);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  async function setSelectedDate(date) {
    setStartDate(date);

    // console.log(date.getDate());
    const bookingsOfDay = bookings.filter(
      (booking) => booking.bookingTime.getDate() === date.getDate()
    );

    function randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }

    const newUnavailableTimes = bookingsOfDay.map(
      (booking) => booking.bookingTime
    );

    setUnavailableTimes(newUnavailableTimes);
  }

  const filterTime = (time) => {
    // console.log(time.getHours() > 12);
    const hour = time.getHours() + 1;

    if (hour < 9) return false;
    if (hour > 19) return false;
    return true;
    // const currentDate = new Date();
    // const selectedDate = new Date(time);

    // return currentDate.getTime() < selectedDate.getTime();
  };

  useEffect(() => {
    // console.log("hello");

    // console.log("last use efeec");
    // console.log(document);
    let elements = document.getElementsByClassName("react-datepicker__day");
    // console.log(elements.length);

    const date = new Date().getDate();
    let dayOfTheMonth = date.toString();
    if (dayOfTheMonth.length == 1) {
      dayOfTheMonth = `00${dayOfTheMonth}`;
    }
    if (dayOfTheMonth.length == 2) {
      dayOfTheMonth = `0${dayOfTheMonth}`;
    }
    console.log(dayOfTheMonth);
    // return console.log(dayOfTheMonth.length);
    // console.log(typeof date.toString());

    setTimeout(() => {
      for (let element of elements) {
        // if (element.classList.contains("react-datepicker__day--001")) {
        if (
          element.classList.contains(`react-datepicker__day--${dayOfTheMonth}`)
        ) {
          console.log("yes");
          console.log(element);
        } else {
          console.log("no");
          // element.style.visibility = "hidden";
          // element.style.display = "none";
        }
      }
    }, 1000);
  }, []);

  if (!loading)
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full ">
          <DatePicker
            wrapperClassName="date-picker"
            selected={startDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            // withPortal
            inline
            customInput={<ExampleCustomInput />}
            filterTime={filterTime}
            filterDate={filterDate}
            timeIntervals={60}
            excludeTimes={unavailableTimes}
            // calendarClassName="stripes"
            //   inline
          />
        </div>
        <button
          className="bg-green-500 px-6 py-2 text-white rounded-md shadow-lg mt-4"
          onClick={createBooking}
        >
          Create Booking
        </button>

        {startDate && <div>{startDate.toString()}</div>}
      </div>
    );
}
