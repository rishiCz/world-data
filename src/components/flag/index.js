import ReactCountryFlag from "react-country-flag";
import { useSelector } from "react-redux";

const Flag = () => {
  const activeCountry = useSelector((state) => state.country.activeCountry);
  return (
    <>
      <ReactCountryFlag countryCode={activeCountry} style={{scale:'2'}} svg />
    </>
  );
};
export default Flag;
