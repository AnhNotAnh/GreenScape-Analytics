import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";



function CountryTemperatureDetail() {
    let params = useParams();
    const [countryTemData, setCountryTemData] = useState([]);
    const [minYear, setMinYear] = useState();
    const [maxYear, setMaxYear] = useState([]);
    const [countryId, setCountryId] = useState(params.countryId)
    const [regionId, setRegionId] = useState(params.regionId)
    

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
            <div>
                <h2>Country Temperature Data From {maxYear} to {minYear}</h2>
            </div>
            <div className="container text-center">
                <div class="row justify-content-center mt-3">
                    <div class="col">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Change</th>
                                    <th scope="col">Value</th>
                                    <th scope="col">Regional Average</th>
                                    <th scope="col">Regional Minimum</th>
                                    <th scope="col">Regional Maximum</th>
                                </tr>
                            </thead>
                            {countryTemData.map((obj) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{obj.theCountryTempData.year}</th>
                                        <td>{obj.theCountryTempData.unit} </td>
                                        <td>{obj.theCountryTempData.change} </td>
                                        <td>{obj.theCountryTempData.value}</td>
                                        <td>{obj.regionalAvg != null ? obj.regionalAvg : "No values"}</td>
                                        <td>{obj.regionalMin != null ? obj.regionalMin : "No values"}</td>
                                        <td>{obj.regionalMax != null ? obj.regionalMax : "No values"}</td>
                                    </tr>
                                </tbody>))
                            }
                        </table>
                    </div>
                </div>
                <Link to={"/Country/" + regionId} className="btn btn-primary mb-2">Back to Country</Link>
            </div>

        </>
    )
}

export default CountryTemperatureDetail