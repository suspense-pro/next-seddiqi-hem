const GreenTick = ({ fill, className }: { fill?: string; className?: string }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="12" rx="6" fill="#04B23F" />
    <path
      d="M4.60423 8.45613C4.7056 8.56596 4.84898 8.62733 4.99845 8.62497C5.14786 8.62255 5.28919 8.55656 5.387 8.44358L9.02163 4.24356C9.21137 4.02431 9.18743 3.69276 8.96819 3.50302C8.74895 3.31328 8.41736 3.33721 8.22762 3.55646L4.97739 7.31231L3.76039 5.99392C3.56372 5.78088 3.23157 5.7676 3.01851 5.96426C2.80546 6.16093 2.79217 6.49304 2.98884 6.70614L4.60423 8.45613Z"
      fill="white"
    />
  </svg>
);

export default GreenTick;
