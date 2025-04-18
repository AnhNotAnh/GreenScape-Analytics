import CardCity from './CardCity'
import React, { useState, useEffect } from 'react'
import { useParams, Link} from "react-router-dom";

function CardCitySearch({ countryName, countryImage, regionName, regionId }) {
    let params = useParams();
    const [cardData, setCardData] = useState([]);
    const [query, setQuery] = useState('');
    const [countryId, setCountryId] = useState(params.countryId);
    const [loading, setLoading] = useState(true);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5256/api/C_Cities/${countryId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => {
                setCardData(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [countryId, query]);

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
                                src={countryImage} 
                                alt={"Image of " + countryName}
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="card-body">
                            <div className="mb-2">
                                <span className="badge bg-primary me-2">{regionName}</span>
                                <span className="badge bg-success">{countryName}</span>
                            </div>
                            <h4 className="card-title">{countryName}</h4>
                            <p className="card-text text-muted mb-3">
                                Total cities: {cardData.length}
                            </p>
                            <Link to={"/Country/" + regionId} className="btn btn-primary">
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Countries
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mb-4 mt-3">
                <div className="col-md-8 col-lg-6">
                    <form method="post" onSubmit={handleSubmit} className="card shadow-sm">
                        <div className="card-body">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    name="searchText" 
                                    className="form-control" 
                                    placeholder="Search cities..." 
                                    aria-label="Search cities"
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

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {cardData.length > 0 ? (
                        cardData.map((obj) => (
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={obj.cityID}>
                                <CardCity
                                    cityID={obj.cityID}
                                    cityName={obj.cityName}
                                    airQualityYearRange={obj.airQualityYearRange}
                                    recordCount={obj.recordCount}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-warning">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                No cities found. {searchActive && 'Try a different search term.'}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardCitySearch;