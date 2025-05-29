import React from 'react';

export default function OrangeBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',         // below header
        left: 0,
        width: '100%',
        height: '320px',
        pointerEvents: 'none',
        zIndex: 0,           // behind content
        overflow: 'hidden',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <path
          fill="#ff5500"
          fillOpacity="0.8"
          transform="scale(1, -1) translate(0, -320)"
          d="M0,32L30,37.3C60,43,120,53,180,74.7C240,96,300,128,360,160C420,192,480,224,540,229.3C600,235,660,213,720,181.3C780,149,840,107,900,80C960,53,1020,43,1080,53.3C1140,64,1200,96,1260,112C1320,128,1380,128,1410,128L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </svg>
    </div>
  );
}
