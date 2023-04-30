import React, { useEffect, useState } from 'react'
import haze from "../assets/haze.jpg"

//const apiKey = d07100db02f6146ec3c58678e2c66765

const Container = () => {
    const [input, setInput] = useState('')

    function handleChange(event) {
        const change = event.target.value
        setInput(change)
        console.log(change)
    }

    function handleSubmit() {
        console.log("submitted")

        useEffect(() => {
            const getData = async () => {
                try {
                    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}")
                } catch(error) {
                    console.log(error)
                } finally {
                    console.log()
                }
            };
            
            getData();
        }, [])
    }
  return (
    <div className='container'>
        <div className='search-box'>
            <input type="text" id='search' placeholder='Search city...' value={input} onChange={handleChange} />
            <button onClick={handleSubmit}>Search</button>
        </div>

        <div className='temp-img'>
            <img src={haze} alt="" />
            <h2>Temperature: <span>282 0c</span></h2>
            <h2>cloud type: <span>Haze</span></h2>
        </div>

        <div className='Humi-wind'>
            <h2>Humidity: <span>56%</span></h2>
            <h2>Wind Speed: <span>7km/h</span></h2>
        </div>
    </div>
  )
}

export default Container;