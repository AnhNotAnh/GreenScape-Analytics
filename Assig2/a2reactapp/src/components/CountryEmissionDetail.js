import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";

function CountryEmissionDetail() {
    const countryData = useLocation();

    return (
        <>
            <div>
                <h2>Country Emission Detail</h2>
            </div>
            <div className="container text-center">
                <div class="row justify-content-center mt-3">
                    <div className="col-3">
                        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
                            <img className="card-img-top" src={countryData.state.countryImage} alt={"Image of " + countryData.state.countryName} />
                            <div className="card-body">
                                <h5 className="card-title">Region Name: {countryData.state.regionName}</h5>
                                <h5 className="card-title">Country Name: {countryData.state.countryName}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CountryEmissionDetail