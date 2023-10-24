import { Link } from "react-router-dom";

const CardRegion = ({ regionId, regionName, imageUrl, countryCount }) =>
(
    <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }} >
        <img className="card-img-top" src={imageUrl} alt={"Image of " + regionName} />
        <div className="card-body">
            <h5 className="card-title">Name: {regionName}</h5>
            <p className="card-text">Country count: {countryCount}</p>
            <Link to={"/Products/" + regionId} className="btn btn-primary">View Detail</Link>
        </div>
    </div>
)

export default CardRegion