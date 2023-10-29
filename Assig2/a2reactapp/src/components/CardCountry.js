import { Link } from "react-router-dom";

const CardCountry = ({ countryId, countryName, iso3, imageUrl, cityCount , emissionDataYearRange, temperatureDataYearRange }) =>
(<div className="col-3">
        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
        <img className="card-img-top" src={imageUrl} alt={"Image of " + countryName} />
            <div className="card-body">
            <h5 className="card-title">Name: {countryName}</h5>
                <p className="card-text">ISO3: {iso3}</p>
            <p className="card-text">City count: {cityCount}</p>
            <Link to={"/Country/CountryTemperatureDetail/" + countryId } className="btn btn-primary ">View Country Tempeture Detail</Link>
            <Link to={"/Country/CountryEmissionDetail/" + countryId} className="btn btn-warning mt-2 ">View Country Emission Detail</Link>
            <Link to={"/City/" + countryId} className="btn btn-info mt-2">City</Link>
            </div>
        </div>
    </div>
)

export default CardCountry