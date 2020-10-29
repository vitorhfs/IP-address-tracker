import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import mapIcon from '../components/mapIcon';

const Main = () => {
    const [ input, setInput ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ timezone, setTimezone ] = useState('');
    const [ isp, setIsp ] = useState('');
    const [ ipAddress, setIpAddress ] = useState('');
    const [ lat, setLat ] = useState(-25.4872759);
    const [ lng, setLng ] = useState(-49.2942842);
    const [ api, setApi ] = useState({});

    const url = 'https://geo.ipify.org/api/v1?apiKey=at_OwPkUKRiVfMLRkpoTXF6VAql02V5T&';
    const regexUrl = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/gm;
    const regexIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/gm;
    let specs;
    
    useEffect(() => {
        const fetchInitialIP = async () => {
            const initialResult = await axios(
                'https://geo.ipify.org/api/v1?apiKey=at_OwPkUKRiVfMLRkpoTXF6VAql02V5T&ipAddress='
            ).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert(error.response.data.messages);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                };
            });
            setApi(initialResult);
        }

        fetchInitialIP();
    }, []);

    useEffect(() => {           
        if (api === undefined)
            return;            

        if (api.hasOwnProperty('data')){
            setIpAddress(api.data.ip);
            setLocation(`${api.data.location.city}, ${api.data.location.country}`);
            setTimezone(api.data.location.timezone);
            setIsp(api.data.isp);
            setLat(api.data.location.lat);
            setLng(api.data.location.lng);
        } else {
            setIpAddress('');
            setLocation('');
            setTimezone('');
            setIsp('');
            setLat('');
            setLng('');
        }
    }, [api]);
    
    async function handleSubmit(event){
        event.preventDefault();
        
        if (input.match(regexIp)){
            specs = 'ipAddress=';
        } else if (input.toLowerCase().match(regexUrl)){
            specs = 'domain='
        } else {
            alert('invalid IP or Domain');
        }
        
        let result = await axios(
            `${url}${specs}${input}`
            ).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert(error.response.data.messages);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                };
            });
            
            setApi(result);
        }
               
        function handleChange(event){
            setInput(event.target.value);
        }

        return (
            <main className="main-container">
            <section className="search">
                <h1>IP Address Tracker</h1>
            <form className="textcontainer" onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for any IP address or domain" onChange={handleChange}/>
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
                </button>
            </form>
            <div className="result">
                <div className="element ipadress">
                    <h2>IP ADDRESS</h2>
                    <p>{ipAddress}</p>
                </div>
                <hr className="divisor"/>
                <div className="element location">
                    <h2>LOCATION</h2>
                    <p>{location}</p>
                </div>
                <hr className="divisor"/>
                <div className="element timezone">
                    <h2>TIMEZONE</h2>
                    <p>{timezone !== '' && `USD ${timezone}`}</p>
                </div>
                <hr className="divisor"/>
                <div className="element isp">
                    <h2>ISP</h2>
                    <p>{isp}</p>
                </div>
            </div>
            </section>
            <section className="map">
                <Map 
                    center={[lat, lng]} 
                    zoom={16} 
                    style={{
                        width: '100%', 
                        height: '100%'
                    }}
                >
                    <TileLayer 
                    url={`https://b.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                    />
                    <Marker 
                        position={[lat, lng]}
                        icon={mapIcon}
                    />
                </Map>
            </section>
        </main>
    )
}

export default Main;