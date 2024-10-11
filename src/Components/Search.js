import React, { useState } from 'react';
import axios from 'axios';
import '../Component_css/Search.css'
const Search = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error messages

    try {
      const apiKey = '14f4c02663d95f3a00add37e236fb6b0'; // Replace with your OpenWeatherMap API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setCity(''); // Clear the input field after submission
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-for">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={handleInputChange}
          className="search-inp"
          required
        />
        <button type="submit" className="search-bt">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Search;
