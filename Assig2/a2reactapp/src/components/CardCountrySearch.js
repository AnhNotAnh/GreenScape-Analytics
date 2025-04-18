import CardCountry from './CardCountry'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

function CardCountrySearch() {
    let params = useParams();
    const [countryData, setCountryData] = useState([]);
    const [query, setQuery] = useState('');
    const [regionId, setRegionId] = useState(params.regionId);
    const [regionData, setRegionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${regionId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => { 
                setCountryData(data.countryList); 
                setRegionData(data.theRegion);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [regionId, query]);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const searchQuery = formData.get("searchText");
        setSearchActive(searchQuery !== '');
        setQuery(searchQuery);
    }

    function clearSearch() {
        setQuery('');
        setSearchActive(false);
    }

    return (
        <div className="container">
            <div className="row justify-content-center mb-4">
                <div className="col-md-6 col-lg-5 col-xl-4">
                    <div className="card shadow-sm">
                        <div className="position-relative" style={{ height: '200px' }}>
                            <img 
                                className="card-img-top" 
                                src={regionData.regionId === 0 ? "https://th.bing.com/th/id/OIP.vmOLNNSaYrF1wZQ_JewEcAHaE8?pid=ImgDet&rs=1" : regionData.imageUrl} 
                                alt={"Image of " + regionData.regionName}
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title mb-1">
                                <i className="bi bi-globe-americas me-2 text-primary"></i>
                                {regionData.regionName}
                            </h4>
                            <p className="card-text text-muted mb-3">
                                Total countries: {regionData.regionId === 0 ? countryData.length : regionData.countryCount}
                            </p>  
                            <Link to={"/Region"} className="btn btn-primary">
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Regions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {(regionData.countryCount > 1 || regionData.regionId === 0) && (
                <div className="row justify-content-center mb-4 mt-3">
                    <div className="col-md-8 col-lg-6">
                        <form method="post" onSubmit={handleSubmit} className="card shadow-sm">
                            <div className="card-body">
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        name="searchText" 
                                        className="form-control" 
                                        placeholder="Search countries..." 
                                        aria-label="Search countries"
                                        defaultValue={query}
                                    />
                                    {searchActive && (
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary" 
                                            onClick={clearSearch}
                                        >
                                            <i className="bi bi-x"></i>
                                        </button>
                                    )}
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-search me-1"></i> Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {countryData.length > 0 ? (
                        countryData.map((obj) => (
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={obj.countryId}>
                                <CardCountry
                                    countryId={obj.countryId}
                                    countryName={obj.countryName}
                                    iso3={obj.iso3}
                                    cityCount={obj.cityCount}
                                    imageUrl={obj.imageUrl}
                                    temperatureDataYearRange={obj.temperatureDataYearRange}
                                    emissionDataYearRange={obj.emissionDataYearRange}
                                    regionId={regionId}
                                    regionName={regionData.regionName}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-warning">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                No countries found. {searchActive && 'Try a different search term.'}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardCountrySearch;