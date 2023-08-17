import styles from "./styles.module.css";
import { useSelector } from "react-redux";

const Flag = () => {
  const countryState = useSelector((state) => state.country);
  const flagsrc = countryState.countryData.flags
    ? countryState.countryData.flags.png
    : "";
  return (
    <>
      <img className={styles.flagImg} src={flagsrc} />
    </>
  );
};
export default Flag;
