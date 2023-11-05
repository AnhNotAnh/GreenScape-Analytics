import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";
function AirQualityDetail() {

    const cityData = useLocation();
    const [theCityDetail, setTheCityDetail] = useState([]);
    const [airQualityData, setAirQualityData] = useState([]);
    const [stationType, setStationType] = useState([]);
    let params = useParams();
    const [cityId, setCityId] = useState(params.cityId)

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => { setTheCityDetail(data.theCityDetail); setAirQualityData(data.theCityAirQualityData); setStationType(data.theCityAirQualityData.dataStationDetail) })
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
                <div className="row justify-content-center mt-3">
                    <h6 className="mt-3">Summary of Air Quality of {theCityDetail.countryName} by Year</h6>
                    <div className="col">
                        <table className="table table-bordered">
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
                            <tbody>
                                {airQualityData.map((obj, index) => (
                                    <tr key={index}>
                                        <th scope="row">{obj.year}</th>
                                        <td>{obj.countryPM10Avg} </td>
                                        <td>{obj.countryPM10Min} </td>
                                        <td>{obj.countryPM10Max}</td>
                                        <td>{obj.countryPM25Avg }</td>
                                        <td>{obj.countryPM25Min }</td>
                                        <td>{obj.countryPM25Max }</td>
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <h6 className="mt-3">Air Quality of {theCityDetail.cityName} city each year</h6>
                    <div className="col">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Annual Mean</th>
                                    <th scope="col">Temporal Coverage1</th>
                                    <th scope="col">Annual Mean PM10</th>
                                    <th scope="col">Annual Mean(Ugm3)</th>
                                    <th scope="col">Temporal Coverage2</th>
                                    <th scope="col">Annual Mean PM25</th>
                                    <th scope="col">Reference</th>
                                    <th scope="col">DB Year</th>
                                    <th scope="col">Station Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {airQualityData.map((obj, index) => (
                                    <tr key={index}>
                                        <th scope="row">{obj.theAirQualityData.year}</th>
                                        <td>{obj.theAirQualityData.annualMean} </td>
                                        <td>{obj.theAirQualityData.temporalCoverage1}</td>
                                        <td>{obj.theAirQualityData.annualMeanPm10}</td>
                                        <td>{obj.theAirQualityData.annualMeanUgm3}</td>
                                        <td>{obj.theAirQualityData.temporalCoverage2}</td>
                                        <td>{obj.theAirQualityData.annualMeanPm25}</td>
                                        <td>{obj.theAirQualityData.reference}</td>
                                        <td>{obj.theAirQualityData.dbYear} </td>
                                        <td>{obj.dataStationDetail.map((station, stationIndex) => (<p key={stationIndex }>{station.stationType }</p>))} </td>
                                    </tr>
                                ))}
                            </tbody>     
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <h6 className="mt-3">Stationary Detail of city each year</h6>
                    <div className="col">
                        {airQualityData.map((obj, index) => (
                        <div key={index}>
                            <p>Year: {obj.theAirQualityData.year}</p>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Stationary Type</th>
                                        <th scope="col">Station Number</th>
                                    </tr>
                                </thead>
                                <tbody>  
                                    {obj.dataStationDetail.map((station, stationIndex) => (
                                    <tr key={stationIndex}>
                                        <td>{station.stationType}</td>
                                        <td>{station.stationNumber}</td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    )
}

export default AirQualityDetail