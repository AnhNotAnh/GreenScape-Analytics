import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";

function CountryEmissionDetail() {
    const countryData = useLocation();
    const [countryEmissionSum, setCountryEmissionSum] = useState([]);
    let params = useParams();
    const [countryId, setCountryId] = useState(params.countryId)
    const [elementList, setElementList] = useState([]);
    const [countryEmissionAd, setCountryEmissionAd] = useState([]);
    const [showEmissionAd, setShowEmissionAd] = useState(false) // show table if true

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


    function showEmissionData(e) {
        setShowEmissionAd(true)

        const elementID = e.target.value

        fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${countryId}?elementId=${elementID}`)
            .then(response => response.json())
            .then(data => setCountryEmissionAd(data))
            .catch(err => {
                console.log(err)
            })
    }

    function turnOffEmission() {
        setShowEmissionAd(false)
    }

    return (
        <>
            <div>
                <h2>Country Emission Summary</h2>
            </div>
            <div className="container text-center">
                <div className="row justify-content-center mt-3">
                    <div className="col-3">
                        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
                            <img className="card-img-top" src={countryData.state.countryImage} alt={"Image of " + countryData.state.countryName} />
                            <div className="card-body">
                                <p className="card-title">Region Name: {countryData.state.regionName}</p>
                                <p className="card-title">Country Name: {countryData.state.countryName}</p>
                                <Link to={"/Country/" + countryData.state.regionId} className="btn btn-primary mb-2">Back to Country</Link>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="row justify-content-center mt-3">
                    <h6 className="mt-3">Summary of emission data by year and element</h6>
                    <div className="col">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Element</th>
                                    <th scope="col">Total Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countryEmissionSum.map((obj, index) => (
                                    <tr key={index }>
                                        <th scope="row">{obj.year}</th>
                                        <td>{obj.element} </td>
                                        <td>{obj.totalValue} </td>
                                    </tr>))}
                            </tbody>  
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <h6 >List of element</h6>
                    <div className="col">
                        <table className="table table-bordered">
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
                                        <th scope="row">{obj.elementName}</th>
                                        <td>{obj.unit} </td>
                                        <td>
                                            <button type="button" value={obj.elementId} onClick={showEmissionData} className="btn btn-success">Show more</button>    
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {showEmissionAd !== false &&
                <div className="row justify-content-center mt-3">
                    <div className="col">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                { countryEmissionAd.length ? countryEmissionAd.map((obj, index) => (
                                     <tr key={index}>
                                         <th scope="row">{obj.year}</th>
                                         <td>{obj.itemName} </td>
                                         <td>{obj.value} </td>
                                     </tr>)) : <tr><td colSpan="3" className="table-active">Data is not available for this element, try different one !</td></tr>}
                            </tbody>
                            </table>
                        </div>
                    </div>}
                <div>
                    {showEmissionAd !== false && <button type="button" onClick={turnOffEmission} className="btn btn-outline-secondary mb-3">Show less</button>}
                </div> 
            </div>
        </>
    )
}

export default CountryEmissionDetail