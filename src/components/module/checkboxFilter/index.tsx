import React, { useState } from "react";
import styles from "./checkboxFilter.module.scss";
import Typography from "@components/module/typography";
import { Tickbox, SearchIcon, Tick } from "@assets/images/svg";

interface CheckboxFilterProps {
  title: string;
  options: string[];
  hasSearch?: boolean;
  onOptionChange: (option: string) => void;
  selectedOptions: string[];
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  title,
  options,
  hasSearch,
  onOptionChange,
  selectedOptions,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onOptionChange(value);
  };

  const handleViewMore = () => {
    setShowAll(!showAll);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {hasSearch && (
        <div className={styles.searchBar}>
          <SearchIcon fill="#" className={styles.searchIcon} />
          <input
            type="text"
            placeholder={`Search for ${title.toLowerCase()}`}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      )}
      <div className={styles.checkboxGroup}>
        {filteredOptions
          .slice(0, showAll ? filteredOptions.length : 10)
          .map((option) => (
            <label key={option} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleOptionChange}
                className={styles.checkboxInput}
              />
              <div className={styles.customCheckbox}>
                <div className={styles.checkboxTickbox}>
                  {" "}
                  <Tickbox />
                </div>

                {selectedOptions.includes(option) && (
                  <div className={styles.tickIcon}>
                    {" "}
                    <Tick />
                  </div>
                )}
              </div>
              <Typography
                align="left"
                variant="p"
                className={styles.checkboxTitle}
              >
                {option}
              </Typography>
            </label>
          ))}
        {filteredOptions.length > 8 && (
          <div className={styles.viewMoreButton}>
            <button onClick={handleViewMore}>
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxFilter;
