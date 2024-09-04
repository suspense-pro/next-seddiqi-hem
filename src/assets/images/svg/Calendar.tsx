const Calendar = ({ fill, className }: { fill?: string; className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <g clip-path="url(#clip0_13237_1812)">
      <path d="M20.291 9.32764L1.29102 9.32764" stroke="#464F4A" />
      <path d="M5.84375 0.619141V5.36914" stroke="#464F4A" />
      <path d="M14.75 0.619141L14.75 5.36914" stroke="#464F4A" />
      <path d="M18.9062 5.96289V2.99414H1.09375V18.4316H18.9062V12.0983" stroke="#464F4A" />
    </g>
    <defs>
      <clipPath id="clip0_13237_1812">
        <rect width="20" height="20" fill="white" transform="translate(0 0.119141)" />
      </clipPath>
    </defs>
  </svg>
);

export default Calendar;
