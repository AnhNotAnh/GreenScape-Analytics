import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/Home'
import Country from './routes/Country'
import Region from './routes/Region'
import City from './routes/City'
import CountryTemperatureDetail from './components/CountryTemperatureDetail'
import CountryEmissionDetail from './components/CountryEmissionDetail'
import AirQualityDetail from './components/AirQualityDetail'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="Home" element={<Home />} />
                    <Route path="Region" element={<Region />} />
                    <Route path="Country/:regionId" element={<Country />} />
                        {/*<Route path=":regionId" element={<Country />} />*/}
                    <Route path="Country/CountryTemperatureDetail/:countryId" element={<CountryTemperatureDetail />} /> 
                    <Route path="Country/CountryEmissionDetail/:countryId" element={<CountryEmissionDetail />} /> 
                    <Route path="City/:countryId" element={<City />} />
                    <Route path="City/AirQualityDetail/:cityId" element={<AirQualityDetail />} />
                    <Route path="" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
