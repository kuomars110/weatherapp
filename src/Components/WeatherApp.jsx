import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import loadingGif from "../assets/images/loading.gif";
import { useState, useEffect } from "react";

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "8b8528bc04534fa32f1d35362493f6bb";

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLocation = "Tehran";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${API_KEY}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
      setLoading(false);
    };
    fetchDefaultWeather();
  }, []);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const saerch = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== "200") {
        setData({ notFound: true });
      } else {
        setData(searchData);
        setLocation("");
      }
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saerch();
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  const backgroundImages = {
    Clear: "linear-gradient(to right,#f3b07c,#fcd283)",
    Clouds: "linear-gradient(to right,#57d6d4,#71eeec)",
    Rain: "linear-gradient(to right,#5bc8fb,#80eaff)",
    Snow: "linear-gradient(to right,#aff2ff,#fff)",
    Haze: "linear-gradient(to right,#57d6d4,#71eeec)",
    Mist: "linear-gradient(to right,#57d6d4,#71eeec)",
  };

  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main]
    : "linear-gradient(to right,#f3b07c,#fcd283)";

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

  return (
    <div className="container" style={{ backgroundImage: backgroundImage }}>
      <div
        className="weather-app"
        style={{
          backgroundImage:
            backgroundImage && backgroundImage.replace
              ? backgroundImage.replace("to right", "to top")
              : null,
        }}
      >
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={saerch}></i>
          </div>
        </div>
        {loading ? (
          <img src={loadingGif} className="loader" alt="loading" />
        ) : data.notFound ? (
          <div className="not-found">
            <p>City Not Found 😢</p>
          </div>
        ) : (
          <>
            <div className="weather">
              <img src={weatherImage} alt="sunny" />
              <div className="weather-type">
                {data.weather ? data.weather[0].main : null}
              </div>
              <div className="temp">
                {data.main ? `${Math.floor(data.main.temp)}°` : null}
              </div>
            </div>
            <div className="weather-date">
              <p>{formattedDate}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">
                  {data.main ? `${data.main.humidity}%` : null}
                </div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">
                  {data.wind ? `${data.wind.speed}km/h` : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
