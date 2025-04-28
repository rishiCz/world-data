import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { useState } from "react";
import { setActiveCountry } from "../../store/slices/countrySlice";
import { allCountries, countryTocca2 } from "../../constants/country";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const dispatch = useDispatch();
  let predefinedOptions = allCountries;

  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = predefinedOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

  };

  const handleOptionClick = (option) => {
    setSearchTerm("");
    dispatch(setActiveCountry(countryTocca2[option]))
  };

  const handleFocus = () => {
    setSearchTerm("")
  }
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search Country"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        <FaSearch color="#b1b1b1"/>
      </div>

      {searchTerm !== "" && (
        <div className={styles.optionsContainer}>
          <ul>
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Search;
