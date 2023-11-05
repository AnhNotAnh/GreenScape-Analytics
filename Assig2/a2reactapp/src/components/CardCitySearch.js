import CardCity from './CardCity'
import React, { useState, useEffect } from 'react'
import { useParams, Link} from "react-router-dom";



function CardCountrySearch({ countryName, countryImage, regionName, regionId }) {
    let params = useParams();
    const [cardData, setCardData] = useState([]);
    const [query, setQuery] = useState('');
    const [countryId, setCountryId] = useState(params.countryId)


    useEffect(() => {
        console.log("Component load useEffect()")
        fetch(`http://localhost:5256/api/C_Cities/${countryId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => setCardData(data))
            .catch(err => {
                console.log(err)
            })
    }, [countryId, query]);

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
                    <div className="col-3">
                        <div className="card mb-2" style={{ width: 18 + 'rem' }} >
                            <img className="card-img-top" src={countryImage} alt={"Image of " + countryName} />
                            <div className="card-body">
                                <h5 className="card-title">Region name: {regionName}</h5> 
                                <h5 className="card-title">Country name: {countryName}</h5> 
                                <Link to={"/Country/" + regionId} className="btn btn-primary stretched-link">Back to country</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="cardCountrySearch">
                    <form method="post" onSubmit={handleSubmit} className="row justify-content-center mb-3  mt-2">
                        <div className="col-3">
                            <input type="text" name="searchText" className="form-control" placeholder="Item Search..." />
                        </div>
                        <div className="col-1 text-left">
                            <button type="submit" className="btn btn-outline-info">Search</button>
                        </div>
                    </form>
                </div>
                <div className="row justify-content-center">
                    {cardData.map((obj) => (
                        <CardCity
                            key={obj.cityID}
                            cityID={obj.cityID}
                            cityName={obj.cityName}
                            airQualityYearRange={obj.airQualityYearRange}
                            recordCount={obj.recordCount}

                        />
                    ))}
                </div>
            </div>
            
        </>

    )
}

export default CardCountrySearch