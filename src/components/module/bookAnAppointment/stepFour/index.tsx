import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

// Get available dates for a month
export const getAvailableDates = (month, year) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in the month
  const availableDates = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isAvailable = date.getDay() !== 0 && date.getDay() !== 6; // Weekends unavailable (adjust logic as needed)

    availableDates.push({
      day: date.toLocaleString('default', { weekday: 'short' }),
      date: day,
      available: isAvailable, // You can add logic here to fetch actual availability from an API
      fullDate: date // Keep the full date for tracking and display
    });
  }

  return availableDates;
};

// Get available time slots for a selected date
export const getTimeSlotsForDate = (selectedDate) => {
  if (selectedDate && selectedDate.available) {
    return ['10:00', '10:45', '11:30', '12:15', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45', '17:30'];
  }
  return [];
};

const StepFour = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null); // Track selected time
  const [noSlotsMessage, setNoSlotsMessage] = useState(false);

  useEffect(() => {
    // Fetch available dates when component mounts or when the month changes
    const dates = getAvailableDates(currentMonth, currentYear);
    setAvailableDates(dates);

    // Select the first available date by default
    const firstAvailableDate = dates.find((date) => date.available);
    if (firstAvailableDate) {
      setSelectedDate(firstAvailableDate);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    // Fetch time slots when the date changes
    if (selectedDate) {
      const timeSlots = getTimeSlotsForDate(selectedDate);
      setAvailableTimeSlots(timeSlots);

      // Show message if no time slots are available
      setNoSlotsMessage(timeSlots.length === 0);
    }
  }, [selectedDate]);

  const handleDateClick = (date) => {
    if (date.available) {
      setSelectedDate(date); // Track selected date here
      setSelectedTime(null); // Reset selected time when a new date is clicked
    }
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev' && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      return;
    }

    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time); // Track the selected time slot
  };

  return (
    <div className={styles.dateSelector}>
      <h2 className={styles.h2}>Select a Date & Time</h2>

      {/* Month Navigation */}
      <div className={styles.monthNav}>
        <button
          className={styles.button}
          onClick={() => handleMonthChange('prev')}
          disabled={currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()}
        >
          &lt;
        </button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </span>
        <button className={styles.button} onClick={() => handleMonthChange('next')}>
          &gt;
        </button>
      </div>

      {/* Date Picker with Horizontal Scroll */}
      <div className={styles.dateContainer}>
        <div className={styles.dates}>
          {availableDates.map((item) => (
            <div
              key={item.date}
              className={`${styles.dateItem} ${selectedDate && selectedDate.date === item.date ? styles.selected : ''} ${
                !item.available ? styles.disabled : ''
              }`}
              onClick={() => handleDateClick(item)}
            >
              <div>{item.day}</div>
              <div>{item.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slot Picker with Horizontal Scroll */}
      <div className={styles.timeContainer}>
        {noSlotsMessage ? (
          <p>No available time slots for this date.</p>
        ) : (
          <div className={styles.times}>
            {availableTimeSlots.map((time) => (
              <div
                key={time}
                className={`${styles.timeItem} ${selectedTime === time ? styles.selectedTime : ''}`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display selected date and time for user confirmation */}
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
    </div>
  );
};

export default StepFour;
