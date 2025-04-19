import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";
import EmissionGraph from './graphs/EmissionGraph';

function CountryEmissionDetail() {
    const countryData = useLocation();
    const [countryEmissionSum, setCountryEmissionSum] = useState([]);
    let params = useParams();
    const [countryId, setCountryId] = useState(params.countryId)
    const [elementList, setElementList] = useState([]);
    const [countryEmissionAd, setCountryEmissionAd] = useState([]);
    const [showEmissionAd, setShowEmissionAd] = useState(false); // show table if true
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${countryId}`)
            .then(response => response.json())
            .then(data => setCountryEmissionSum(data))
            .catch(err => {
                console.log(err)
            })
    }, [countryId]);


    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/B_Countries/GetElementList`)
            .then(response => response.json())
            .then(data => setElementList(data))
            .catch(err => {
                console.log(err)
            })
    }, []);


    function showEmissionData(elementID, elementName) {
        setShowEmissionAd(true);
        setSelectedElement(elementName);

        fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${countryId}?elementId=${elementID}`)
            .then(response => response.json())
            .then(data => setCountryEmissionAd(data))
            .catch(err => {
                console.log(err)
            })
    }

    function turnOffEmission() {
        setShowEmissionAd(false);
        setSelectedElement(null);
    }

    return (
        <>
            <div className="container-fluid py-4 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">
                        <i className="bi bi-cloud-haze2 me-2"></i>
                        Country Emission Summary
                    </h2>
                    
                    <div className="row">
                        {/* Country Card */}
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
                                        <span className="badge bg-primary">Emission Data</span>
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
                        
                        {/* Emission Summary */}
                        <div className="col-lg-8 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-success text-white">
                                    <h5 className="mb-0">
                                        <i className="bi bi-bar-chart-fill me-2"></i>
                                        Summary of Emission Data by Year and Element
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
                                                    <i className="bi bi-tag me-1"></i>
                                                    Element
                                                </th>
                                                <th scope="col">
                                                    <i className="bi bi-calculator me-1"></i>
                                                    Total Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {countryEmissionSum.map((obj, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{obj.year}</th>
                                                    <td>{obj.element}</td>
                                                    <td>
                                                        <span className="badge bg-light text-dark">
                                                            {obj.totalValue}
                                                        </span>
                                                    </td>
                                                </tr>))}
                                        </tbody>  
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Emission Graph Visualization */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-graph-up me-2"></i>
                                Emission Data Visualization
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    {countryEmissionSum.length > 0 ? (
                                        <div className="graph-responsive text-center">
                                            <EmissionGraph data={countryEmissionSum} width={800} height={400} />
                                        </div>
                                    ) : (
                                        <div className="alert alert-info">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Loading emission data visualization...
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="alert alert-info">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-lightbulb me-3 fs-3"></i>
                                        <div>
                                            <h5>Understanding Emission Data</h5>
                                            <p>This graph visualizes greenhouse gas emissions over time for {countryData.state.countryName}. Each color represents a different element, such as CO2, CH4 (methane), or N2O (nitrous oxide).</p>
                                            <p className="mb-0">Higher values indicate greater emissions for that element in that year.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Element List Card */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-info text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-list-ul me-2"></i>
                                Available Elements
                            </h5>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Element Name</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col">More Emission Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementList.map((obj, index) => (
                                        <tr key={index}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-diagram-3 me-2 text-secondary"></i>
                                                    {obj.elementName}
                                                </div>
                                            </th>
                                            <td>{obj.unit}</td>
                                            <td>
                                                <button 
                                                    type="button" 
                                                    onClick={() => showEmissionData(obj.elementId, obj.elementName)} 
                                                    className={`btn btn-sm ${selectedElement === obj.elementName ? 'btn-success' : 'btn-outline-success'}`}
                                                >
                                                    <i className="bi bi-search me-1"></i>
                                                    Show Details
                                                </button>    
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Detailed Emission Data (Conditional) */}
                    {showEmissionAd && (
                    <div className="card shadow-sm mb-4 border-success">
                        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                <i className="bi bi-info-circle me-2"></i>
                                Detailed {selectedElement} Emission Data
                            </h5>
                            <button 
                                className="btn btn-sm btn-light" 
                                onClick={turnOffEmission} 
                                title="Close details"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Year</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {countryEmissionAd.length ? countryEmissionAd.map((obj, index) => (
                                        <tr key={index}>
                                            <th scope="row">{obj.year}</th>
                                            <td>{obj.itemName}</td>
                                            <td>{obj.value}</td>
                                        </tr>)) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">
                                                <div className="alert alert-warning mb-0">
                                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                                    Data is not available for this element, try a different one!
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer text-center">
                            <button 
                                type="button" 
                                onClick={turnOffEmission} 
                                className="btn btn-outline-secondary"
                            >
                                <i className="bi bi-chevron-up me-2"></i>
                                Hide Details
                            </button>
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default CountryEmissionDetail