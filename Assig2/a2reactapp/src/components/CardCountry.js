import { Link } from "react-router-dom";

const CardCountry = ({ countryId, countryName, iso3, imageUrl, cityCount , emissionDataYearRange, temperatureDataYearRange }) =>
(<div className="col-3">
        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
        <img className="card-img-top" src={imageUrl} alt={"Image of " + countryName} />
            <div className="card-body">
            <h5 className="card-title">Name: {countryName}</h5>
                <p className="card-text">ISO3: {iso3}</p>
            <p className="card-text">City count: {cityCount}</p>
            <Link to={"/Country/CountryTemperatureDetail"} className="btn btn-primary stretched-link">View Country Tempeture Detail</Link>
            </div>
        </div>
    </div>
)

export default CardCountry