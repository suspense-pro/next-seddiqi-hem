const SearchIcon = ({
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
    <path
      fill={fill ?? "#032715"}
      d="M21 22.7375L15.5298 15.41C18.9931 12.8094 19.6984 7.88451 17.1054 4.41089C14.5125 0.937277 9.60221 0.229878 6.13888 2.83133C2.67554 5.43199 1.97024 10.3561 4.56399 13.8297C6.31816 16.1792 9.13148 17.2629 11.8405 16.9135"
      stroke="#464F4A"
      stroke-miterlimit="10"
    />
  </svg>
);

export default SearchIcon;
