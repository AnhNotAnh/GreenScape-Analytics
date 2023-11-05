import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";
function AirQualityDetail() {

    const cityData = useLocation();
    const [theCityDetail, setTheCityDetail] = useState([]);
    let params = useParams();
    const [cityId, setCityId] = useState(params.setCityId)

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => setTheCityDetail(data))
            .catch(err => {
                console.log(err)
            })
    }, [cityId]);

    return (
        <>
            <div>
                <h2>Air Quality Detail</h2>
            </div>
            <div className="container text-center">
                <div className="row justify-content-center mt-3">
                    <div className="col-3">
                        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
                            <img className="card-img-top" src={cityData.state.countryImage} alt={"Image of " + cityData.state.countryName} />
                            <div className="card-body">
                                <p className="card-title">Region name: {cityData.state.regionName}</p>
                                <p className="card-title">Country name: {cityData.state.countryName}</p>
                                {/*<p className="card-title">City name: {cityData.state.regionName}</p>*/}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>


        </>
    )
}

export default AirQualityDetail