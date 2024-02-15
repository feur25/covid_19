import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import * as topojson from 'topojson'; // Import de la bibliothèque topojson

const WorldMap = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/cases_deaths/total_deaths.csv');
        const rawData = response.data;

        // Parse CSV data
        const parsedData = d3.csvParse(rawData);

        // Process data to group by date and country
        const processedData = processData(parsedData);

        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const groupedData = d3.rollup(data, v => d3.sum(v, d => +d.World), d => d.date.slice(0, 4), d => d.location);
    const mapData = Array.from(groupedData, ([year, totalsByCountry]) => ({ year, totalsByCountry }));
    return mapData;
  };

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // D3 projection
    const projection = d3.geoNaturalEarth1()
      .translate([width / 2, height / 2])
      .scale(150);

    // Path generator
    const path = d3.geoPath().projection(projection);

    // Define color scale
    const colorScale = d3.scaleSequential(d3.interpolateOranges);

    // Animate function
    const animate = (frame) => {
      const frameData = data[frame];
      if (!frameData) return;

      const countryTotals = frameData.totalsByCountry;
      const maxTotalDeaths = d3.max(Array.from(countryTotals.values()));

      colorScale.domain([0, maxTotalDeaths]);

      svg.selectAll('path')
        .attr('fill', d => {
          const country = d.properties.name;
          const totalDeaths = countryTotals.get(country) || 0;
          return colorScale(totalDeaths);
        });
    };

    // Render world map
    d3.json('https://raw.githubusercontent.com/topojson/world-atlas/master/world/110m.json')
      .then(worldData => {
        const countries = topojson.feature(worldData, worldData.objects.countries);

        svg.selectAll('path')
          .data(countries.features)
          .enter().append('path')
          .attr('d', path)
          .attr('fill', 'lightgray')
          .attr('stroke', 'white');

        // Animate through years
        let frame = 0;
        const interval = setInterval(() => {
          animate(frame);
          frame = (frame + 1) % data.length;
        }, 1000);

        return () => clearInterval(interval); // Cleanup
      });
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default WorldMap;
