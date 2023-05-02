import React, { useEffect, useState } from 'react'
import axios from "axios"
import errorImage from "../assets/errorImage.jpg"
import Spinner from './Spinner'

const APIKEY = "d07100db02f6146ec3c58678e2c66765"

const Container = () => {
    const [input, setInput] = useState('')

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKEY}&units=metric`)
    //             setData(response.data)
    //             setError(null)
    //         } catch(error) {
    //             setError(error.message)
    //             setData(null)
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
        
    //     getData();
    // }, [])

    function handleChange(event) {
        const change = event.target.value
        setInput(change)
        // console.log(change)
    }

    async function handleSubmit() {
        console.log("submitted")
        setLoading(true)
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKEY}&units=metric`)
            setData(response.data)
            setError(null)
        } catch(error) {
            setError(error.message)
            setData(null)
        } finally {
            setLoading(false);
        }

        
    }
  return (
    <div className='container'>
        <div className='search-box'>
            <input type="text" id='search' placeholder='Search city...' value={input} onChange={handleChange} />
            <button onClick={handleSubmit}>Search</button>
        </div>

        {loading && <Spinner />}

        {error && <div>
            <img src={errorImage} alt="error" />
            <p>{`${error}: There is a problem fetching the weather`}</p>
            </div>}

        <div>
            {data && 
                    <div>
                        <div className='temp-img'>
                            <img src={`icons/${data.weather[0].icon}.png`} alt="haze" />
                            <h2>Temperature: <span>{Math.round(data.main.temp)} &deg;C</span></h2>
                            <h3>Feels Like: <span>{Math.round(data.main.feels_like)} &deg;C</span></h3>
                            <h2>Description: <span>{data.weather[0].description}</span></h2>
                        </div>

                        <div className='Humi-wind'>
                            <h2>Humidity: <span>{data.main.humidity}%</span></h2>
                            <h2>Wind Speed: <span>{data.wind.speed} m/s</span></h2>
                        </div>
                    </div>

            
            }
        </div>
        
        
    </div>
  )
}

export default Container;