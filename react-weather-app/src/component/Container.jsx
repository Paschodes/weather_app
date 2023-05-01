import React, { useEffect, useState } from 'react'
import axios from "axios"
import haze from "../assets/haze.jpg"
import errorImage from "../assets/errorImage.jpg"

const APIKEY = "d07100db02f6146ec3c58678e2c66765"

const Container = () => {
    const [input, setInput] = useState('')

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=${APIKEY}`)
                setData(response.data)
                setError(null)
            } catch(error) {
                setError(error.message)
                setData(null)
            } finally {
                setLoading(false);
            }
        };
        
        getData();
    }, [])

    function handleChange(event) {
        const change = event.target.value
        setInput(change)
        console.log(change)
    }

    function handleSubmit() {
        console.log("submitted")
        setLoading(true)

        
    }
  return (
    <div className='container'>
        <div className='search-box'>
            <input type="text" id='search' placeholder='Search city...' value={input} onChange={handleChange} />
            <button onClick={handleSubmit}>Search</button>
        </div>

        {loading && <p>Please hold, we are locating your city...</p>}

        {error && <div>
            <img src={errorImage} alt="error" />
            <p>{`There is a problem fetching the weather: ${error}`}</p>
            </div>}

        <div>
        {data && data.map((item) => (
            <div>
                <div className='temp-img'>
                    <img src={haze} alt="haze" />
                    <h2>Temperature: <span>{item.main.temperature}</span></h2>
                    <h2>Description: <span>{item.weather[0].description}</span></h2>
                </div>

                <div className='Humi-wind'>
                    <h2>Humidity: <span>{item.main.humidity}</span></h2>
                    <h2>Wind Speed: <span>{item.wind.speech}</span></h2>
                </div>
            </div>
            
        ))
        }
        </div>
        
        
    </div>
  )
}

export default Container;