import { Link } from "react-router-dom";

const CardRegion = ({ regionId, regionName, imageUrl, countryCount }) => (
    <div className="card h-100 shadow-sm hover-card">
        <div className="position-relative overflow-hidden card-img-container" style={{ height: '180px' }}>
            <img 
                className="card-img-top" 
                src={regionId === 0 ? "https://th.bing.com/th/id/OIP.vmOLNNSaYrF1wZQ_JewEcAHaE8?pid=ImgDet&rs=1" : imageUrl} 
                alt={`Image of ${regionName}`} 
                style={{ height: '100%', objectFit: 'cover' }}
            />
            <div className="region-overlay">
                <span className="badge bg-primary">Region</span>
            </div>
        </div>
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{regionName}</h5>
            <div className="d-flex align-items-center mb-3">
                <i className="bi bi-flag-fill me-2 text-secondary"></i>
                <p className="card-text mb-0">Countries: <span className="fw-bold">{countryCount}</span></p>
            </div>
            <Link to={"/Country/" + regionId} className="btn btn-outline-primary mt-auto">
                <i className="bi bi-eye me-2"></i>View Countries
            </Link>
        </div>
    </div>
);

export default CardRegion;