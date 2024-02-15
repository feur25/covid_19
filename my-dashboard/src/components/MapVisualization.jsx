import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import worldMapData from "./world-110m.json";

const useTimer = ({ startTime, endTime, step, frequency }) => {
  const [time, setTime] = useState(startTime.valueOf());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((time) => time + step);
      }, 1000 / frequency);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (time >= endTime.valueOf()) stop();
  }, [time, endTime.valueOf()]);

  const play = () => setIsPlaying(true);
  const stop = () => setIsPlaying(false);

  return { time: new Date(time), play, stop };
};

const MapVisualization = () => {
  const [mapData, setMapData] = useState(null);
  const { time, play, stop } = useTimer({
    startTime: new Date("1/1/2020"),
    endTime: new Date("12/31/2023"),
    step: 1000 * 60 * 60 * 24 * 30,
    frequency: 1,
  });

  useEffect(() => {
    const mapTopology = feature(worldMapData, worldMapData.objects.countries);

    const projection = d3.geoMercator().fitSize([800, 600], mapTopology);
    const path = d3.geoPath().projection(projection);

    setMapData({ mapTopology, projection, path });
  }, []);

  return (
    <div className="App">
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
      <h1>{time.toLocaleString()}</h1>
      <svg width={800} height={600}>
        {mapData && (
          <g>
            {mapData.mapTopology.features.map((feature, index) => (
              <path
                key={index}
                d={mapData.path(feature)}
                style={{
                  fill: "lightgrey",
                  stroke: "white",
                  strokeWidth: 0.5,
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

export default MapVisualization;
