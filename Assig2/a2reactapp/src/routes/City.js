import CardCitySearch from '.././components/CardCitySearch' 
import { useLocation } from "react-router-dom";
function City() {
    const cityData = useLocation();
    return (
        <>
            <div>
                <h2>City</h2>
            </div>
            <CardCitySearch countryName={cityData.state.countryName} countryImage={cityData.state.countryImage} regionName={cityData.state.regionName} regionId={cityData.state.regionId} />

        </>
    )
}

export default City