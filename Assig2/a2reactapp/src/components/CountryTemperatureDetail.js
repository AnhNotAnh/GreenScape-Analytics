import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";



function CountryTemperatureDetail() {
    let params = useParams();
    const [countryTemData, setCountryTemData] = useState([]);
    const [minYear, setMinYear] = useState();
    const [maxYear, setMaxYear] = useState([]);
    const [countryId, setCountryId] = useState(params.countryId)
    

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
                <h2>Country Temperature Data Frrom {minYear} to {maxYear}</h2>
            </div>
            
        </>
    )
}

export default CountryTemperatureDetail