import React from 'react';
// import TotalDeaths from '../components/TotalDeaths';
import MapVisualization from '../components/MapVisualization';

function Home() {

  return (
    
    <main className='main-container'>
      {/* <TotalDeaths /> */}
      <MapVisualization />
      <iframe
        src="https://data-visualisation-feur25.streamlit.app/?embed=true"
        title="Streamlit Application"
        width="100%"
        height="600px"
        style={{ border: "none", backgroundColor: "#263043" }}
        frameBorder="0"
      ></iframe>
    </main>
  );
}

export default Home;
