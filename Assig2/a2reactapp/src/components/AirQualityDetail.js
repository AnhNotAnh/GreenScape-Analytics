import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";
import AirQualityGraph from './graphs/AirQualityGraph';

function AirQualityDetail() {
    const cityData = useLocation();
    const [theCityDetail, setTheCityDetail] = useState([]);
    const [airQualityData, setAirQualityData] = useState([]);
    const [stationType, setStationType] = useState(false);
    let params = useParams();
    const [cityId, setCityId] = useState(params.cityId)

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => { setTheCityDetail(data.theCityDetail); setAirQualityData(data.theCityAirQualityData); })
            .catch(err => {
                console.log(err)
            })
    }, [cityId]);

    function showStationType() {
        if (stationType === false) {
            setStationType(true)
        }
        else setStationType(false)
    }

    return (
        <>
            <div className="container-fluid py-4 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">
                        <i className="bi bi-wind me-2"></i>
                        Air Quality Detail
                    </h2>
                    
                    <div className="row">
                        {/* City Card */}
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-sm hover-card h-100">
                                <img className="card-img-top" 
                                    src={theCityDetail.imageUrl} 
                                    alt={`Image of ${theCityDetail.countryName}`}
                                    style={{height: '200px', objectFit: 'cover'}} 
                                />
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                        <h5 className="card-title mb-0">{theCityDetail.cityName}</h5>
                                    </div>
                                    
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="bi bi-flag-fill text-secondary me-2"></i>
                                        <p className="card-text mb-0">{theCityDetail.countryName}</p>
                                    </div>
                                    
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-globe2 text-info me-2"></i>
                                        <p className="card-text mb-0">{theCityDetail.regionName}</p>
                                    </div>
                                    
                                    <Link 
                                        to={"/City/" + theCityDetail.countryID} 
                                        state={{ 
                                            countryName: theCityDetail.countryName, 
                                            countryImage: theCityDetail.imageUrl, 
                                            regionName: theCityDetail.regionName, 
                                            regionId: theCityDetail.regionId 
                                        }} 
                                        className="btn btn-outline-primary w-100"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back to City List
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        {/* Air Quality Summary */}
                        <div className="col-md-8 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">
                                        <i className="bi bi-bar-chart-fill me-2"></i>
                                        Summary of Air Quality by Year
                                    </h5>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">Year</th>
                                                <th scope="col">PM10 Avg</th>
                                                <th scope="col">PM10 Min</th>
                                                <th scope="col">PM10 Max</th>
                                                <th scope="col">PM25 Avg</th>
                                                <th scope="col">PM25 Min</th>
                                                <th scope="col">PM25 Max</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {airQualityData.map((obj, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{obj.year}</th>
                                                    <td>{obj.countryPM10Avg}</td>
                                                    <td>{obj.countryPM10Min}</td>
                                                    <td>{obj.countryPM10Max}</td>
                                                    <td>{obj.countryPM25Avg}</td>
                                                    <td>{obj.countryPM25Min}</td>
                                                    <td>{obj.countryPM25Max}</td>
                                                </tr>
                                            ))}
                                        </tbody> 
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Air Quality Graph Visualization */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-info text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-graph-up me-2"></i>
                                Air Quality Trend Visualization
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    {airQualityData.length > 0 ? (
                                        <div className="graph-responsive text-center">
                                            <AirQualityGraph data={airQualityData} width={800} height={400} />
                                        </div>
                                    ) : (
                                        <div className="alert alert-info">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Loading air quality data visualization...
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="alert alert-info">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-lightbulb me-3 fs-3"></i>
                                        <div>
                                            <h5>Understanding Air Quality Metrics</h5>
                                            <p>This graph shows PM10 and PM2.5 average concentrations by year. PM10 refers to particulate matter less than 10 micrometers in diameter, while PM2.5 refers to particulate matter less than 2.5 micrometers.</p>
                                            <p className="mb-0">The WHO guidelines for annual mean concentrations are 20 µg/m³ for PM10 and 10 µg/m³ for PM2.5 (shown as dotted lines when applicable).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Detailed Air Quality Data */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                <i className="bi bi-info-circle me-2"></i>
                                Air Quality of {theCityDetail.cityName} by Year
                            </h5>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Year</th>
                                        <th scope="col">Annual Mean</th>
                                        <th scope="col">Temporal Coverage1</th>
                                        <th scope="col">Annual Mean PM10</th>
                                        <th scope="col">Annual Mean(Ugm3)</th>
                                        <th scope="col">Temporal Coverage2</th>
                                        <th scope="col">Annual Mean PM25</th>
                                        <th scope="col">Reference</th>
                                        <th scope="col">DB Year</th>
                                        <th scope="col">Station Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {airQualityData.map((obj, index) => (
                                        <tr key={index}>
                                            <th scope="row">{obj.theAirQualityData.year}</th>
                                            <td>{obj.theAirQualityData.annualMean}</td>
                                            <td>{obj.theAirQualityData.temporalCoverage1}</td>
                                            <td>{obj.theAirQualityData.annualMeanPm10}</td>
                                            <td>{obj.theAirQualityData.annualMeanUgm3}</td>
                                            <td>{obj.theAirQualityData.temporalCoverage2}</td>
                                            <td>{obj.theAirQualityData.annualMeanPm25}</td>
                                            <td>{obj.theAirQualityData.reference}</td>
                                            <td>{obj.theAirQualityData.dbYear}</td>
                                            <td>
                                                {obj.dataStationDetail.map((station, stationIndex) => (
                                                    <span key={stationIndex} className="badge bg-secondary me-1">{station.stationType}</span>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>     
                            </table>
                        </div>
                    </div>
                    
                    {/* Station Type Details (Collapsible) */}
                    {stationType && (
                        <div className="card shadow-sm mb-4 border-info">
                            <div className="card-header bg-light">
                                <h5 className="mb-0">
                                    <i className="bi bi-building me-2"></i>
                                    Station Details by Year
                                </h5>
                            </div>
                            <div className="card-body">
                                {airQualityData.map((obj, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="bi bi-calendar-event me-2 text-primary"></i>
                                            <h6 className="mb-0">Year: {obj.theAirQualityData.year}</h6>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-sm table-bordered">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">Station Type</th>
                                                        <th scope="col">Station Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {obj.dataStationDetail.map((station, stationIndex) => (
                                                        <tr key={stationIndex}>
                                                            <td>{station.stationType}</td>
                                                            <td>{station.stationNumber}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="d-flex justify-content-center">
                        <button 
                            type="button" 
                            onClick={showStationType} 
                            className={`btn ${stationType ? 'btn-outline-secondary' : 'btn-outline-info'} px-4`}
                        >
                            <i className={`bi ${stationType ? 'bi-chevron-up' : 'bi-chevron-down'} me-2`}></i>
                            {stationType ? 'Hide Station Details' : 'Show Station Details'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AirQualityDetail