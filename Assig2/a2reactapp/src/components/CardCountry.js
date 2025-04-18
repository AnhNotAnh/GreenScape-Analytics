import { Link } from "react-router-dom";

const CardCountry = ({ countryId, countryName, iso3, imageUrl, cityCount, emissionDataYearRange, temperatureDataYearRange, regionId, regionName }) => (
    <div className="card h-100 shadow-sm hover-card">
        <div className="position-relative overflow-hidden card-img-container" style={{ height: '180px' }}>
            <img 
                className="card-img-top" 
                src={imageUrl} 
                alt={`Image of ${countryName}`} 
                style={{ height: '100%', objectFit: 'cover' }}
            />
            <div className="country-overlay">
                <span className="badge bg-success">Country</span>
            </div>
        </div>
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{countryName}</h5>
            <div className="country-details mb-3">
                <p className="card-text mb-1"><small>ISO3: <span className="fw-bold">{iso3 !== "" ? iso3 : "Unknown"}</span></small></p>
                <p className="card-text mb-0">
                    <i className="bi bi-building me-1 text-secondary"></i> 
                    Cities: <span className="fw-bold">{cityCount}</span>
                </p>
            </div>
            
            <div className="d-grid gap-2 mt-auto">
                {temperatureDataYearRange[0] !== 0 && (
                    <Link 
                        to={`/Country/CountryTemperatureDetail/${countryId}`} 
                        state={{ countryName: countryName, countryImage: imageUrl, regionName: regionName, regionId: regionId}} 
                        className="btn btn-sm btn-outline-primary"
                    >
                        <i className="bi bi-thermometer-half me-1"></i>
                        Temperature Data ({temperatureDataYearRange[0]}-{temperatureDataYearRange[1]})
                    </Link>
                )}
                
                {emissionDataYearRange[0] !== 0 && (
                    <Link 
                        to={`/Country/CountryEmissionDetail/${countryId}`} 
                        state={{ countryName: countryName, countryImage: imageUrl, regionName: regionName, regionId: regionId }} 
                        className="btn btn-sm btn-outline-warning"
                    >
                        <i className="bi bi-cloud-haze me-1"></i>
                        Emission Data ({emissionDataYearRange[0]}-{emissionDataYearRange[1]})
                    </Link>
                )}
                
                {cityCount !== 0 && (
                    <Link 
                        to={`/City/${countryId}`} 
                        state={{ countryName: countryName, countryImage: imageUrl, regionName: regionName, regionId: regionId }} 
                        className="btn btn-sm btn-outline-info"
                    >
                        <i className="bi bi-building me-1"></i>
                        View Cities
                    </Link>
                )}
            </div>
        </div>
    </div>
);

export default CardCountry;