import { Col, Row } from "react-bootstrap";
import { MdWaterDrop } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";

const CurrentDayWeather = (props) => {
  const [wheaterCityData, setWheaterCityData] = useState(null);

  const fetchByPosition = async () => {
    console.log("fetch by position");
    console.log("City data", props.cityData);
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          props.cityData.lat +
          "&lon=" +
          props.cityData.lon +
          "&appid=" +
          props.myCustomKey
      );
      if (response.ok) {
        const data = await response.json();
        console.log("fetch by data ok");

        console.log("WHEATER DATA ", data);
        await setWheaterCityData(data);
      } else {
        console.log("Error while fethcing");
      }
    } catch (error) {
      console.log("catch error", error);
    }
  };

  useEffect(() => {
    console.log("i am component did update");
    fetchByPosition();
  }, [props.cityData]);

  return (
    <>
      {wheaterCityData ? (
        <>
          {console.log("i am render current day wheater", wheaterCityData)}

          <Row>
            <h6>{wheaterCityData ? wheaterCityData.name : "niente"}</h6>
          </Row>
          <Row className="d-flex flex-row justify-content-around  text-center">
           
            <Col
              xs={3}
              className="d-flex text-direction-column justify-content-end customCard  "
            >
              <h3>
                {wheaterCityData ? wheaterCityData.weather[0].main : "niente"}
              </h3>
              <p className="subText">
                {wheaterCityData
                  ? wheaterCityData.weather[0].description
                  : "niente"}
              </p>

              <img
                src={
                  wheaterCityData
                    ? props.handleIcons(wheaterCityData.weather[0].icon)
                    : "http://placekitten.com/g/200/300"
                }
                alt=""
              />
            </Col>

            <Col
              xs={3}
              className="d-flex justify-content-center align-items-center customCard "
            >
              <p
                className={
                  "mainDeg " +
                  (wheaterCityData
                    ? props.setColorDeg(
                        parseFloat(wheaterCityData.main.temp) - 273.15
                      )
                    : "")
                }
              >
                {wheaterCityData
                  ? (parseFloat(wheaterCityData.main.temp) - 273.15)
                      .toFixed(0)
                      .toString()
                  : "niente"}
                °C
              </p>
            </Col>
          </Row>
        </>
      ) : (
        <p>niente</p>
      )}
    </>
  );
};

export default CurrentDayWeather;
