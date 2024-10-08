import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { ArrowRight } from "@assets/images/svg";
import TabbedNavigation from "@components/module/tabbedNavigation";
import Register from "../auth/register";
import OtpComponent from "../opt";
import SelectedCard from "../selectedCard";
import SelectedLocation from "../selectedLocation";
import SignIn from "../auth/signIn";

// Get available dates for a month
export const getAvailableDates = (month, year) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const availableDates = [];
  const today = new Date(); // Get today's date

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isAvailable = date.getDay() !== 0 && date.getDay() !== 6 && date >= today; // Check if the date is today or later

    availableDates.push({
      day: date.toLocaleString("default", { weekday: "short" }),
      date: day,
      available: isAvailable,
      fullDate: date,
    });
  }

  return availableDates;
};

// Get available time slots for a selected date
export const getTimeSlotsForDate = (selectedDate) => {
  if (selectedDate && selectedDate.available) {
    return ["10:00", "10:45", "11:30", "12:15", "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30"];
  }
  return [];
};

const StepFour = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [noSlotsMessage, setNoSlotsMessage] = useState(false);

  const dateContainerRef = useRef(null);
  const timeContainerRef = useRef(null);

  useEffect(() => {
    const dates = getAvailableDates(currentMonth, currentYear);
    setAvailableDates(dates);

    const firstAvailableDate = dates.find((date) => date.available);
    if (firstAvailableDate) {
      setSelectedDate(firstAvailableDate);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (selectedDate) {
      const timeSlots = getTimeSlotsForDate(selectedDate);
      setAvailableTimeSlots(timeSlots);

      setNoSlotsMessage(timeSlots.length === 0);
    }
  }, [selectedDate]);

  const handleDateClick = (date) => {
    if (date.available) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleMonthChange = (direction) => {
    if (direction === "prev" && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      return;
    }

    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  // Scroll horizontally on mouse wheel (scroll up and down)
  const handleWheelScroll = (ref) => {
    const onWheel = (e) => {
      e.preventDefault();
      ref.current.scrollLeft += e.deltaY; // Horizontal scroll on wheel movement
    };

    useEffect(() => {
      const container = ref.current;
      container.addEventListener("wheel", onWheel);
      return () => container.removeEventListener("wheel", onWheel);
    }, [ref]);
  };

  handleWheelScroll(dateContainerRef);
  handleWheelScroll(timeContainerRef);

  const [selectedOption, setSelectedOption] = useState(null); // default selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let tabs = [
    {
      id: 1,
      title: "Sign In",
      content: <SignIn />,
    },
    {
      id: 2,
      title: "Register",
      content: <Register />,
      // content: <OtpComponent />,
    },
  ];
  return (
    <div className={styles.dateSelector}>
      <div className={styles.selectedData}>
        <SelectedCard />
        <SelectedLocation />
      </div>
      <div className={styles.header}>
        <div className={styles.h2}>Select a Date & Time</div>
        <div className={styles.monthNav}>
          <button
            className={styles.button}
            onClick={() => handleMonthChange("prev")}
            disabled={currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()}
          >
            <ArrowRight className={styles.arrowLeft} />
          </button>
          <span>
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
          </span>
          <button className={styles.button} onClick={() => handleMonthChange("next")}>
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Date Picker with Mouse Scroll */}
      <div className={styles.dateContainer} ref={dateContainerRef}>
        <div className={styles.dates}>
          {availableDates.map((item) => (
            <div
              key={item.date}
              className={`${styles.dateItem} ${
                selectedDate && selectedDate.date === item.date ? styles.selected : ""
              } ${!item.available ? styles.disabled : ""}`}
              onClick={() => handleDateClick(item)}
            >
              <div className={styles.day}>{item.day}</div>
              <div className={styles.date}>{item.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slot Picker with Mouse Scroll */}
      <div className={styles.timeContainer} ref={timeContainerRef}>
        {noSlotsMessage ? (
          <p>No available time slots for this date.</p>
        ) : (
          <div className={styles.times}>
            {availableTimeSlots.map((time) => (
              <div
                key={time}
                className={`${styles.timeItem} ${selectedTime === time ? styles.selectedTime : ""}`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedDate && selectedTime && (
        <div className={styles.confirmation}>
          <p>
            Selected Date: <strong>{selectedDate.fullDate.toLocaleDateString()}</strong>
          </p>
          <p>
            Selected Time: <strong>{selectedTime}</strong>
          </p>
        </div>
      )}

      <div className={styles.preferenceContainer}>
        <div className={styles.heading}>Select your preference</div>
        <div className={styles.options}>
          <label className={styles.customRadio}>
            <input
              type="radio"
              value="interested"
              checked={selectedOption === "interested"}
              onChange={handleOptionChange}
            />
            <span
              className={`${styles.radioCircle} ${
                selectedOption === "interested" ? styles.selected : styles.notSelected
              }`}
            ></span>
            <span className={selectedOption === "interested" ? styles.selectedText : styles.notSelectedText}>
              I am only interested in this product
            </span>
          </label>

          <label className={styles.customRadio}>
            <input type="radio" value="open" checked={selectedOption === "open"} onChange={handleOptionChange} />
            <span
              className={`${styles.radioCircle} ${selectedOption === "open" ? styles.selected : styles.notSelected}`}
            ></span>
            <span className={selectedOption === "open" ? styles.selectedText : styles.notSelectedText}>
              I am open to similar products
            </span>
          </label>
        </div>
      </div>

      <TabbedNavigation gap={0} className={styles.tabNavigation} tabs={tabs} />
    </div>
  );
};

export default StepFour;
