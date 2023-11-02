import CardCountry from './CardCountry'
import CardRegionCountry from './CardRegionCountry'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";


function CardCountrySearch() {
    let params = useParams();
    const [countryData, setCountryData] = useState([]);
    const [query, setQuery] = useState('');
    const [regionId, setRegionId] = useState(params.regionId)
    const [regionData, setRegionData] = useState([]);

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${regionId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => { setCountryData(data.countryList); setRegionData(data.theRegion) })
            .catch(err => {
                console.log(err)
            })
    }, [regionId, query]);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log("FormData: " + formData.get("searchText"))
        setQuery(formData.get("searchText"))
    }

    return (
        <>
            <div className="container text-center">
                <div className="row justify-content-center">
                    <CardRegionCountry
                        key={regionData.regionId}
                        regionId={regionData.regionId}
                        regionName={regionData.regionName}
                        countryCount={regionData.countryCount}
                        imageUrl={regionData.imageUrl}
                        />
                </div>
            </div>
            {regionData.countryCount > 1 && 
            <div id="cardCountrySearch"> 
                <form method="post" onSubmit={handleSubmit} className="row justify-content-center mb-3  mt-2">
                    <div className="col-3">
                        <input type="text" name="searchText" className="form-control" placeholder="Item Search..." />
                    </div>
                    <div className="col-1 text-left">
                        <button type="submit" className="btn btn-outline-info">Search</button>
                    </div>
                </form>
            </div> }
            <div className="container text-center">
                <div className="row justify-content-center">
                    {countryData.map((obj) => (
                        //<CardCountry
                        //    key={obj.countryId}
                        //    countryId={obj.countryId}
                        //    countryName={obj.countryName}
                        //    iso3={obj.iso3}
                        //    cityCount={obj.cityCount}
                        //    imageUrl={obj.imageUrl}
                        //    temperatureDataYearRange={obj.temperatureDataYearRange}
                        //    emissionDataYearRange={obj.emissionDataYearRange}
                        ///>
                        <div className="col-3">
                            <div className="card mb-2" style={{ width: 18 + 'rem' }} >
                                <img className="card-img-top" src={obj.imageUrl} alt={"Image of " + obj.countryName} />
                                <div className="card-body">
                                    <h5 className="card-title">Name: {obj.countryName}</h5>
                                    <p className="card-text">ISO3: {obj.iso3}</p>
                                    <p className="card-text">City count: {obj.cityCount}</p>
                                    {obj.temperatureDataYearRange[0] !== 0 && <Link to={"/Country/CountryTemperatureDetail/" + regionId + "/" + obj.countryId} className="btn btn-primary ">View Country Temperature {obj.temperatureDataYearRange[0]} - {obj.temperatureDataYearRange[1]}</Link>}
                                    {obj.emissionDataYearRange[0] !== 0 && <Link to={"/Country/CountryEmissionDetail/" + obj.countryId} className="btn btn-warning mt-2 ">View Country Emission {obj.emissionDataYearRange[0]} - {obj.emissionDataYearRange[1]}</Link>}
                                    <Link to={"/City/" + obj.countryId} className="btn btn-info mt-2">City</Link>
                                </div>
                            </div>
                        </div>


                    )
                    )
                    }
                </div>
                {/*which back button is better*/}

                <Link to={"/Region"} className="btn btn-primary">Back to Region</Link>
            </div>
        </>

    )
}

export default CardCountrySearch