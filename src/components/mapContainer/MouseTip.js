import styles from './styles.module.css'
import ReactCountryFlag from 'react-country-flag'
import { RiDonutChartFill } from "react-icons/ri";
import { countryToName } from '../../constants/country'

const MouseTip = ({hoverCountryCode}) => {
    const name = hoverCountryCode ? countryToName[hoverCountryCode]: null
    return (
        <>
            {hoverCountryCode && <div className={styles.mouseTip}>
                <div className={styles.mouseTipTop}>
                    <RiDonutChartFill />
                    <ReactCountryFlag countryCode={hoverCountryCode} />
                    {name}
                </div>
            </div>}
        </>
    )
}

export default MouseTip