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
                        countryCount={regionData.regionId === 0 ?  countryData.length : regionData.countryCount } // present number of country currently from fetching instead of 0 otherwise country count.
                        imageUrl={regionData.imageUrl}
                    />
                </div>
            </div>
            {(regionData.countryCount > 1 || regionData.regionId === 0) && // will not show search bar unless more than one countries. If 'all regions' or no region is selected, search bar will be shown anyway.
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
                        <CardCountry
                            key={obj.countryId}
                            countryId={obj.countryId}
                            countryName={obj.countryName}
                            iso3={obj.iso3}
                            cityCount={obj.cityCount}
                            imageUrl={obj.imageUrl}
                            temperatureDataYearRange={obj.temperatureDataYearRange}
                            emissionDataYearRange={obj.emissionDataYearRange}
                            regionId={regionId}
                            regionName={regionData.regionName}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CardCountrySearch