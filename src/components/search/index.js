import { useDispatch } from "react-redux";
import { getCountryList, setCountryFromName } from "../../utils/mapFunctions";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const Search = () => {
  const dispatch = useDispatch();
  let predefinedOptions = [];
  useEffect(() => {
    predefinedOptions = getCountryList();
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredOptions = predefinedOptions.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setShowOptions(!!searchTerm);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setFilteredOptions([]);
    setShowOptions(false);
    setCountryFromName(option,dispatch)
  };

  const handleFocus = () =>{
    setSearchTerm("")
  }
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      {showOptions && (
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
