import { Link } from "react-router-dom";

const CardCity = ({ cityID, cityName, airQualityYearRange, recordCount }) => (
    <div className="card h-100 shadow-sm hover-card">
        <div className="position-relative card-img-container bg-light d-flex align-items-center justify-content-center" style={{ height: '140px' }}>
            <i className="bi bi-building text-primary" style={{ fontSize: '3rem' }}></i>
            <div className="city-overlay">
                <span className="badge bg-info">City</span>
            </div>
        </div>
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{cityName}</h5>
            <div className="d-flex align-items-center mb-3">
                <i className="bi bi-bar-chart-fill me-2 text-secondary"></i>
                <p className="card-text mb-0">Records: <span className="fw-bold">{recordCount}</span></p>
            </div>
            
            {recordCount !== 0 && (
                <div className="mt-auto">
                    <Link 
                        to={"/City/AirQualityDetail/" + cityID} 
                        className="btn btn-outline-info w-100"
                    >
                        <i className="bi bi-wind me-2"></i>
                        Air Quality ({airQualityYearRange[0]} - {airQualityYearRange[1]})
                    </Link>
                </div>
            )}
        </div>
    </div>
);

export default CardCity;