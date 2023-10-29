import { Link } from "react-router-dom";
function City() {

    return (
        <>
            <div>
                <h2>City</h2>
            </div>
            <div>
                <Link to={"City/AirQualityDetail"} className="btn btn-warning mt-2 ">Air Quality Detail</Link> 
            </div>

        </>
    )
}

export default City