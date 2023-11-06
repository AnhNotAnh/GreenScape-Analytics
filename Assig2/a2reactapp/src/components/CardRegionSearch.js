import CardRegion from './CardRegion'
import React, { useState, useEffect } from 'react'


function CardListSearch() {

    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        console.log("Component load useEffect()")
        fetch('http://localhost:5256/api/A_Regions')
            .then(response => response.json())
            .then(data => setCardData(data))
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <>
            
            <div className="container text-center">
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
            </div>
        </>

    )
}

export default CardListSearch