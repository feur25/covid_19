import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsVirus, BsDropletHalf, BsEyedropper, BsClipboard2Pulse, BsFiletypePptx } from 'react-icons/bs';

function Sidebar() {
  const location = useLocation();

  return (
    <aside id="sidebar">
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsVirus className='icon_header' /> COVID19
        </div>
        <span className='icon close_icon'>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className={`sidebar-list-item ${location.pathname === '/home' ? 'active' : ''}`}>
          <Link to="/home">
            <BsDropletHalf className='icon' /> Nombre de décès
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === '/positif' ? 'active' : ''}`}>
          <Link to="/positif">
            <BsEyedropper className='icon' /> Nombre de cas positif
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === '/prediction' ? 'active' : ''}`}>
          <Link to="/prediction">
            <BsClipboard2Pulse className='icon' /> Prédiction
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === '/job' ? 'active' : ''}`}>
          <Link to="/job">
            <BsFiletypePptx className='icon' /> Impact Sociale
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === '/document' ? 'active' : ''}`}>
          <Link to="/document">
            <BsFiletypePptx className='icon' /> Etude de cas
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
