import { Link } from "react-router-dom";

const CardRegionCountry = ({ regionId, regionName, imageUrl, countryCount }) =>
(<div className="col-3">
        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
            <img className="card-img-top" src={imageUrl} alt={"Image of " + regionName} />
            <div className="card-body">
                <h5 className="card-title">Name: {regionName}</h5>
                <p className="card-text">Country count: {countryCount}</p>
            <Link to={"/Region"} className="btn btn-primary stretched-link">Back to Region</Link>
            </div>
        </div>
    </div>
)

export default CardRegionCountry