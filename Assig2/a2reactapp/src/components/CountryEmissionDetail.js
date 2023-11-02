import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";

function CountryEmissionDetail() {
    const countryData = useLocation();
    const [countryEmissionSum, setCountryEmissionSum] = useState([]);
    let params = useParams();
    const [countryId, setCountryId] = useState(params.countryId)


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
                <div class="row justify-content-center mt-3">
                    <div class="col">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Element</th>
                                    <th scope="col">Total Value</th>
                                </tr>
                            </thead>
                            {countryEmissionSum.map((obj) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{obj.year}</th>
                                        <td>{obj.element} </td>
                                        <td>{obj.totalValue} </td>
                                    </tr>
                                </tbody>))
                            }
                        </table>
                    </div>
                </div>
                <Link to={"/Country/" + countryData.state.regionId} className="btn btn-primary mb-2">Back to Country</Link>
            </div>


        </>
    )
}

export default CountryEmissionDetail