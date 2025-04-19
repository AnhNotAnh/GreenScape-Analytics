import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";
import TemperatureGraph from './graphs/TemperatureGraph';

function CountryTemperatureDetail() {
    let params = useParams();
    const [countryTemData, setCountryTemData] = useState([]);
    const [minYear, setMinYear] = useState();
    const [maxYear, setMaxYear] = useState([]);
    const [countryId, setCountryId] = useState(params.countryId)
    const countryData = useLocation();
    

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/B_Countries/CountryTemperatureDetail/${countryId}`)
            .then(response => response.json())
            .then(data => { setMinYear(data.minYear); setMaxYear(data.maxYear); setCountryTemData(data.rawTemperatureData) })
            .catch(err => {
                console.log(err)
            })
    }, [countryId]);


    return (
        <>
            <div className="container-fluid py-4 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">
                        <i className="bi bi-thermometer-half me-2"></i>
                        Country Temperature Data ({minYear} - {maxYear})
                    </h2>
                    
                    <div className="row">
                        {/* Country Information Card */}
                        <div className="col-lg-4 mb-4">
                            <div className="card shadow-sm hover-card h-100">
                                <div className="position-relative">
                                    <img 
                                        className="card-img-top" 
                                        src={countryData.state.countryImage} 
                                        alt={`Image of ${countryData.state.countryName}`}
                                        style={{height: '200px', objectFit: 'cover'}}
                                    />
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <span className="badge bg-primary">Temperature Data</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-flag-fill text-primary me-2"></i>
                                        <h5 className="card-title mb-0">{countryData.state.countryName}</h5>
                                    </div>
                                    
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-globe2 text-info me-2"></i>
                                        <p className="card-text mb-0">Region: {countryData.state.regionName}</p>
                                    </div>
                                    
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-calendar-range text-secondary me-2"></i>
                                        <p className="card-text mb-0">Data Range: {minYear} to {maxYear}</p>
                                    </div>
                                    
                                    <Link 
                                        to={"/Country/" + countryData.state.regionId} 
                                        className="btn btn-outline-primary w-100"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back to Country
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        {/* Temperature Data Table */}
                        <div className="col-lg-8 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-info text-white">
                                    <h5 className="mb-0">
                                        <i className="bi bi-table me-2"></i>
                                        Temperature Data Records
                                    </h5>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">
                                                    <i className="bi bi-calendar-event me-1"></i>
                                                    Year
                                                </th>
                                                <th scope="col">
                                                    <i className="bi bi-rulers me-1"></i>
                                                    Unit
                                                </th>
                                                <th scope="col">
                                                    <i className="bi bi-arrow-left-right me-1"></i>
                                                    Change
                                                </th>
                                                <th scope="col">
                                                    <i className="bi bi-graph-up me-1"></i>
                                                    Value
                                                </th>
                                                <th scope="col">
                                                    <i className="bi bi-calculator me-1"></i>
                                                    Regional Avg
                                                </th>
                                                <th scope="col">
                                                    <i className="bi bi-arrow-down me-1"></i>
                                                    Regional Min
                                                </th>
                                                <th scope="col">
                                                    <i className="bi bi-arrow-up me-1"></i>
                                                    Regional Max
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {countryTemData.map((obj, index) => (
                                                <tr key={index} className={obj.theCountryTempData.change > 0 ? 'table-danger' : obj.theCountryTempData.change < 0 ? 'table-info' : ''}>
                                                    <th scope="row">{obj.theCountryTempData.year}</th>
                                                    <td>{obj.theCountryTempData.unit}</td>
                                                    <td>
                                                        <span className={`badge ${obj.theCountryTempData.value > 0 ? 'bg-danger' : obj.theCountryTempData.value < 0 ? 'bg-info' : 'bg-secondary'}`}>
                                                            {obj.theCountryTempData.change}
                                                        </span>
                                                    </td>
                                                    <td>{obj.theCountryTempData.value}</td>
                                                    <td>{obj.regionalAvg != null ? obj.regionalAvg : "No values"}</td>
                                                    <td>{obj.regionalMin != null ? obj.regionalMin : "No values"}</td>
                                                    <td>{obj.regionalMax != null ? obj.regionalMax : "No values"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Temperature Graph Visualization */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-graph-up me-2"></i>
                                Temperature Trend Visualization
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    {countryTemData.length > 0 ? (
                                        <div className="graph-responsive">
                                            <TemperatureGraph data={countryTemData} width={800} height={400} />
                                        </div>
                                    ) : (
                                        <div className="alert alert-info">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Loading temperature data visualization...
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="alert alert-info">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-lightbulb me-3 fs-3"></i>
                                        <div>
                                            <h5>Understanding Temperature Trends</h5>
                                            <p>The graph above shows temperature changes over time for {countryData.state.countryName}, with the red line showing the country's temperature and the blue dashed line showing the regional average.</p>
                                            <p className="mb-0">Positive values indicate warming compared to baseline temperatures, while negative values indicate cooling.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* About Temperature Data section (preserved from original) */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-info-circle me-2"></i>
                                About Temperature Data
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="alert alert-info">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-lightbulb me-3 fs-3"></i>
                                    <div>
                                        <h5>Understanding Temperature Data</h5>
                                        <p>Temperature data shows historical climate trends for {countryData.state.countryName}. Positive change values (red) indicate warming, while negative values (blue) indicate cooling compared to baseline.</p>
                                        <p className="mb-0">Regional averages, minimums, and maximums provide context for how this country compares to others in the {countryData.state.regionName} region.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountryTemperatureDetail