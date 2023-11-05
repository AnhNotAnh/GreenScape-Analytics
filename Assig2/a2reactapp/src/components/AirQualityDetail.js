import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";
function AirQualityDetail() {

    const cityData = useLocation();
    const [theCityDetail, setTheCityDetail] = useState([]);
    const [airQualityData, setAirQualityData] = useState([]);
    let params = useParams();
    const [cityId, setCityId] = useState(params.cityId)

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => { setTheCityDetail(data.theCityDetail); setAirQualityData(data.theCityAirQualityData) })
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
                            <img className="card-img-top" src={theCityDetail.imageUrl} alt={"Image of " + theCityDetail.countryName} />
                            <div className="card-body">
                                <p className="card-title">Region name: {theCityDetail.regionName}</p>
                                <p className="card-title">Country name: {theCityDetail.countryName}</p>
                                <p className="card-title">City name: {theCityDetail.cityName}</p>
                                <Link to={"/City/" + theCityDetail.countryId} className="btn btn-primary mt-2 stretched-link">Back to Country</Link>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="row justify-content-center mt-3">
                    <h6 className="mt-3">Summary of Country's Air Quality by Year</h6>
                    <div class="col">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Country PM10 Average</th>
                                    <th scope="col">Country PM10 Min</th>
                                    <th scope="col">Country PM10 Max</th>
                                    <th scope="col">Country PM25 Average</th>
                                    <th scope="col">Country PM25 Min</th>
                                    <th scope="col">Country PM25 Max</th>
                                </tr>
                            </thead>
                            {airQualityData.map((obj) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{obj.year}</th>
                                        <td>{obj.countryPM10Avg} </td>
                                        <td>{obj.countryPM10Min} </td>
                                        <td>{obj.countryPM10Max}</td>
                                        <td>{obj.countryPM25Avg }</td>
                                        <td>{obj.countryPM25Min }</td>
                                        <td>{obj.countryPM25Max }</td>
                                    </tr>
                                </tbody>))
                            }
                        </table>
                    </div>
                </div>
                <div class="row justify-content-center mt-3">
                    <h6 className="mt-3">City's Air Quality each year</h6>
                    <div class="col">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">annualMean</th>
                                    <th scope="col">temporalCoverage1</th>
                                    <th scope="col">annualMeanPm10</th>
                                    <th scope="col">annualMeanUgm3</th>
                                    <th scope="col">temporalCoverage2</th>
                                    <th scope="col">annualMeanPm25</th>
                                    <th scope="col">reference</th>
                                    <th scope="col">dbYear</th>
                                    <th scope="col">stationType</th>
                                    <th scope="col">stationNumber</th>
                                </tr>
                            </thead>
                            {airQualityData.map((obj) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{obj.year}</th>
                                        <td>{obj.countryPM10Avg} </td>
                                        <td>{obj.countryPM10Min} </td>
                                        <td>{obj.countryPM10Max}</td>
                                        <td>{obj.countryPM25Avg}</td>
                                        <td>{obj.countryPM25Min}</td>
                                        <td>{obj.countryPM25Max}</td>
                                    </tr>
                                </tbody>))
                            }
                        </table>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AirQualityDetail