import CardRegion from './CardRegion'
import React, { useState, useEffect } from 'react'


function CardRegionSearch() {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Component load useEffect()")
        setLoading(true);
        fetch('http://localhost:5256/api/A_Regions')
            .then(response => response.json())
            .then(data => {
                setCardData(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    return (
        <>
            <div className="container">
                {loading ? (
                    <div className="d-flex justify-content-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="alert alert-info">
                                    <i className="bi bi-info-circle-fill me-2"></i>
                                    Select a region to explore countries and their environmental data
                                </div>
                            </div>
                        </div>
                        <div className="row g-4">
                            {cardData.map((obj) => (
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={obj.regionId}>
                                    <CardRegion
                                        regionId={obj.regionId}
                                        regionName={obj.regionName}
                                        countryCount={obj.countryCount}
                                        imageUrl={obj.imageUrl}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default CardRegionSearch