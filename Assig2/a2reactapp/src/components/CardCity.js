import { Link } from "react-router-dom";

const CardCity = ({ cityID, cityName, airQualityYearRange, recordCount, regionName, countryName, countryImage, countryId }) =>
(<div className="col-3">
    <div className="card mb-2" style={{ width: 18 + 'rem' }} >
        <div className="card-body">
            <h5 className="card-title">Name: {cityName}</h5>
            <p className="card-text">Record count: {recordCount}</p>
            {recordCount !== 0 && <Link to={"/City/AirQualityDetail/" + cityID} state={{ countryName: countryName, countryImage: countryImage, regionName: regionName, countryId: countryId }} className="btn btn-info mt-2 ">Air Quality Detail {airQualityYearRange[0]} - {airQualityYearRange[1]}</Link>}
            
        </div>
    </div>
</div>
)

export default CardCity