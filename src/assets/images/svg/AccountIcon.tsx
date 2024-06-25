const AccountIcon = ({
  fill,
  className,
}: {
  fill?: string;
  className?: string;
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_4511_11280)">
      <path
        fill={fill ?? "#032715"}
        d="M1.2002 23.0373C1.66667 17.8027 7.33346 13.6966 12.1693 13.6966C16.4695 13.6966 21.4277 16.9441 22.8002 21.3451H5.4002M17.5637 6.38559C17.5637 9.38051 15.1359 11.8083 12.141 11.8083C9.14607 11.8083 6.71829 9.38051 6.71829 6.38559C6.71829 3.39067 9.14607 0.962891 12.141 0.962891C15.1359 0.962891 17.5637 3.39067 17.5637 6.38559Z"
        stroke="#464F4A"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <clipPath id="clip0_4511_11280">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default AccountIcon;
