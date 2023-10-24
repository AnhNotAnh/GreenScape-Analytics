import CardRegion from './CardRegion'
import React, { useState, useEffect } from 'react'


function CardListSearch() {

    const [cardData, setCardData] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        console.log("Component load useEffect()")
        /*fetch(`http://localhost:5256/api/A_Regions?SearchText=${query}`)*/
        fetch('http://localhost:5256/api/A_Regions')
            .then(response => response.json())
            .then(data => setCardData(data))
            .catch(err => {
                console.log(err)
            })
    }, []);

    //function searchQuery() {
    //    const value = document.querySelector('[name="searchText"]').value;
    //    setQuery(value);
    //}

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log("FormData: " + formData.get("searchText"))
        setQuery(formData.get("searchText"))

       
    }

    return (
        <>
            <div id="cardListSearch">
                <form method="post" onSubmit={handleSubmit} className="row justify-content-center mb-3  mt-2">
                    <div className="col-3">
                        <input type="text" name="searchText" className="form-control" placeholder="Item Search..." />
                    </div>
                    <div className="col-3 text-left">
                        <button type="submit" className="btn btn-outline-info">Search</button>
                    </div>
                </form>
            </div>
            <div className="row justify-content-center">
                {cardData.map((obj) => (
                    <CardRegion
                        key={obj.regionId}
                        regionId={obj.regionId}
                        regionName={obj.regionName}
                        countryCount={obj.countryCount}
                        imageUrl={obj.imageUrl}
                    />
                )
                )
                }
            </div>
        </>

    )
}

export default CardListSearch