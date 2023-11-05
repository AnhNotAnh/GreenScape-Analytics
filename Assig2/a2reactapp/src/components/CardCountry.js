import { Link } from "react-router-dom";

const CardCountry = ({ countryId, countryName, iso3, imageUrl, cityCount , emissionDataYearRange, temperatureDataYearRange, regionId, regionName}) =>
(<div className="col-3">
        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
        <img className="card-img-top" src={imageUrl} alt={"Image of " + countryName} />
            <div className="card-body">
            <h5 className="card-title">Name: {countryName}</h5>
                <p className="card-text">ISO3: {iso3 !== "" ? iso3 : "Unknown"}</p>
            <p className="card-text">City count: {cityCount}</p>
            {/*Passing regionId using state instead of passing through params of link, it's safer */}
            {/*{temperatureDataYearRange[0] !== 0 && <Link to={"/Country/CountryTemperatureDetail/" + regionId + "/" + countryId} state={{ countryName: countryName, countryImage: imageUrl, regionName: regionName }}  className="btn btn-primary" >View Country Temperature {temperatureDataYearRange[0]} - {temperatureDataYearRange[1]}</Link>}*/}
            {/*{emissionDataYearRange[0] !== 0 && <Link to={"/Country/CountryEmissionDetail/" + regionId + "/" + countryId} className="btn btn-warning mt-2 ">View Country Emission {emissionDataYearRange[0]} - {emissionDataYearRange[1]}</Link>}*/}

            {temperatureDataYearRange[0] !== 0 && <Link to={"/Country/CountryTemperatureDetail/" + countryId} state={{ countryName: countryName, countryImage: imageUrl, regionName: regionName, regionId: regionId}} className="btn btn-primary" >View Country Temperature {temperatureDataYearRange[0]} - {temperatureDataYearRange[1]}</Link>}
            {emissionDataYearRange[0] !== 0 && <Link to={"/Country/CountryEmissionDetail/" + countryId} state={{ countryName: countryName, countryImage: imageUrl, regionName: regionName, regionId: regionId }} className="btn btn-warning mt-2 ">View Country Emission {emissionDataYearRange[0]} - {emissionDataYearRange[1]}</Link>}
            {cityCount !== 0 && <Link to={"/City/" + countryId} className="btn btn-info mt-2" state={{ countryName: countryName, countryImage: imageUrl, regionName: regionName }}>View Cities</Link>}
            </div>
        </div>
    </div>
)

export default CardCountry