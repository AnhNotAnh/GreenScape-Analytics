import CardCitySearch from '.././components/CardCitySearch' 
import { useLocation } from "react-router-dom";
function City() {
    const cityData = useLocation();
    return (
        <>
            <div>
                <h2>City</h2>
            </div>
            <CardCitySearch countryName={cityData.state.countryName} countryImage={cityData.state.imageUrl} regionName={cityData.state.regionName} />

        </>
    )
}

export default City