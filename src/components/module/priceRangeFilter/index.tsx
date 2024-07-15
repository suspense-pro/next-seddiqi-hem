import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Range } from "react-range";
import styles from "./priceRangeFilter.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dataFromServer = {
  values: {
    "250": 22,
    "500": 198,
    "1000": 55,
    "1500": 111,
    "2000": 78,
    "3000": 67,
    "4000": 59,
    "5000": 28,
    "7500": 28,
    "10000": 21,
    "12500": 19,
    "15000": 111,
    "20000": 25,
    "25000": 15,
    "30000": 67,
    "40000": 150,
    "50000": 3,
    "50001": 70,
    "55000": 120,
    "60000": 16,
    "65000": 8,
    "70000": 22,
    "75000": 18,
    "80000": 14,
    "85000": 300,
    "90000": 5,
    "95000": 9,
    "100000": 17,
    "105000": 4,
    "110000": 2,
    "115000": 6,
  },
};

const PriceRangeFilter = () => {
  const prices = Object.keys(dataFromServer.values)
    .map((key) => parseInt(key))
    .sort((a, b) => a - b);
  const [priceRange, setPriceRange] = useState([0, prices.length - 1]);

  const getBackgroundColor = (price) => {
    const priceIndex = prices.indexOf(price);
    return priceIndex >= priceRange[0] && priceIndex <= priceRange[1]
      ? "#464f4a"
      : "#CCCBC7";
  };

  const data = {
    labels: prices,
    datasets: [
      {
        label: "",
        data: prices.map((price) => dataFromServer.values[price]),
        backgroundColor: prices.map((price) => getBackgroundColor(price)),
        barThickness: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
            display: false,  
          }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
            display: false,  
          }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.histogram}>
        <div className={styles.heading}>PRICE</div>
        <Bar data={data} options={options} />
      </div>
      <div className={styles.rangeSlider}>
        <Range
          step={1}
          min={0}
          max={prices.length - 1}
          values={priceRange}
          onChange={(newRange) => setPriceRange(newRange)}
          renderTrack={({ props, children }) => {
            const percentageLeft = (priceRange[0] / (prices.length - 1)) * 100;
            const percentageRight = (priceRange[1] / (prices.length - 1)) * 100;
            return (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "2px",
                  width: "100%",
                  background: `linear-gradient(to right, #ccc 0%, #ccc ${percentageLeft}%, black ${percentageLeft}%, black ${percentageRight}%, #ccc ${percentageRight}%, #ccc 100%)`,
                }}
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                backgroundColor: "black",
              }}
            />
          )}
        />
        <div className={styles.labelContainer}>
          <div>
            <div className={styles.labels}>Min Price</div>
            <span className={styles.price}>AED {prices[0]}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className={styles.labels}>Max Price</div>
            <span className={styles.price}>
              AED {prices[prices.length - 1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
