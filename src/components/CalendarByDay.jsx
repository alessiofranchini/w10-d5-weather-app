import { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";

const CalendarByDay = (props) => {
  const setColorDeg = (degValue = 0) => {
    switch (true) {
      case degValue >= 14:
        return "hotDeg";
        break;
      case degValue <= 0:
        return "coldDeg";
        break;
      default:
        return "normalDeg";
    }
  };
  const handleIcons = (iconId = "10d") => {
    const imageUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
    return imageUrl;
  };
  const [forecast, setForecast] = useState();

  const fetchByForecast = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          props.lat +
          "&lon=" +
          props.lon +
          "&appid=" +
          props.myCustomKey
      );
      if (response.ok) {
        const data = await response.json();
        setForecast(data);
        console.log("Forecast", data);
      } else {
        console.log("Error while fethcing");
      }
    } catch (error) {
      console.log("catch error", error);
    }
  };

  useEffect(() => {
    fetchByForecast();
  }, []);

  useEffect(() => {
    fetchByForecast();
  }, [props.lat]);

  return (
    <>
      
    </>
  );
};
export default CalendarByDay;
