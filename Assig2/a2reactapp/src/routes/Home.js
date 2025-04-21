import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12 text-center mb-4">
                        <h2 className="display-4">Welcome to Green Scape Analytics</h2>
                        <p className="lead">Explore environmental data from regions and countries around the world</p>
                    </div>
                </div>
                
                <div className="row my-5">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h3 className="card-title">
                                    <i className="bi bi-globe-americas text-primary mb-3 d-block" style={{ fontSize: "2rem" }}></i>
                                    Regions
                                </h3>
                                <p className="card-text">Explore environmental data categorized by geographical regions across the world.</p>
                                <Link to="/Region" className="btn btn-outline-primary mt-2">View Regions</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h3 className="card-title">
                                    <i className="bi bi-flag-fill text-success mb-3 d-block" style={{ fontSize: "2rem" }}></i>
                                    Countries
                                </h3>
                                <p className="card-text">Browse countries and view detailed temperature and emission data.</p>
                                <Link to={"/Country/0"} className="btn btn-outline-success mt-2">View Countries</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h3 className="card-title">
                                    <i className="bi bi-graph-up-arrow text-danger mb-3 d-block" style={{ fontSize: "2rem" }}></i>
                                    Environmental Data
                                </h3>
                                <p className="card-text">Access air quality metrics, temperature records, and emission statistics.</p>
                                <Link to="/Region" className="btn btn-outline-danger mt-2">Start Exploring</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h4>About This Application</h4>
                                <p>Green Scape Analytics provides historical environmental data including air quality measurements, temperature records, and emission statistics from regions and countries worldwide. This application allows researchers, students, and environmental enthusiasts to explore data trends and make informed analyses.</p>
                                <p>Select a region to begin exploring the available environmental data.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="alert alert-warning" role="alert">
                            <h5 className="alert-heading text-center">⚠️ Disclaimer</h5>
                            <hr />
                            <p><strong>Please Note:</strong>  The data displayed on this platform is provided for educational and demonstration purposes only. While aiming for accuracy, some information may be incomplete, outdated, or incorrect.</p>
                            <p>This site should not be used for decision-making or official reporting.</p>
                            <p className="mb-0 text-center"><strong>Always refer to verified and official sources for accurate environmental data.</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home