import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import mapIcon from '../components/mapIcon';

const Main = () => {
    const [ input, setInput ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ timezone, setTimezone ] = useState('');
    const [ isp, setIsp ] = useState('');
    const [ ipAddress, setIpAddress ] = useState('');
    const [ lat, setLat ] = useState(-25.4872759);
    const [ lng, setLng ] = useState(-49.2942842);

    const url = 'http://ip-api.com/json/';
    const specs = '?fields=status,message,country,region,regionName,city,lat,lon,timezone,isp,query';
    const regexUrl = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/gm;
    const regexIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/gm;
    
    useEffect(() => {
        const fetchInitialIP = async () => {
            const initialResult = await axios(
                'https://api.ipify.org?format=json'
            );
            setAddress(initialResult.data.ip);
        }

        fetchInitialIP();
    }, []);

    useEffect(() => {

        const fetchAPI = async () => {
            let result = await axios(
                `${url}${address}${specs}`
            );
            
            if (result.data.status === 'success' && address !== ''){
                setIpAddress(result.data.query);
                setLocation(`${result.data.city}, ${result.data.country}`);
                setTimezone(result.data.timezone);
                setIsp(result.data.isp);
                setLat(result.data.lat);
                setLng(result.data.lon);
            } else if(result.data.status === 'fail'){
                setIpAddress(`I DON'T EXIST`);
                setLocation(`TRY`);
                setTimezone(`SEARCHING`);
                setIsp(`AGAIN`);
            }
        }
                
        fetchAPI();        
    }, [address]);

    if(lat === undefined || lng === undefined){
        setLat(-25.4872759);
        setLng(-49.2942842);
    }

    function handleSubmit(event){
        event.preventDefault();
   
        input.toLowerCase().match(regexUrl) || input.match(regexIp)
        ? setAddress(input.toLowerCase())
        : alert('Maybe your search is wrong, try typing other addres/IP');
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
                    <p>{timezone}</p>
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