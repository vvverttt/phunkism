import './App.css';
import React, { useState } from 'react';

const TABS = ['Random', 'Chronological', 'Artist', 'Trope', 'Newest'];
const TROPE_SUBTABS = ['Mash-up', 'Cropping', 'Visual Culture', 'Art Reference'];

// Example image data
const images = [
  {
    url: '/green_candle.jpg', // Path to your image in the public folder
    artist: 'Vert',      // Replace with your artist name
    trope: 'Art Reference',         // Or Cropping, Visual Culture, Art Reference, etc.
    title: 'Green Candle',
    size: '984 x 984px'
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('Random');
  const [activeTrope, setActiveTrope] = useState(TROPE_SUBTABS[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter images based on tab
  let filteredImages = images;
  if (activeTab === 'Trope') {
    filteredImages = images.filter(img => img.trope === activeTrope);
  } else if (activeTab === 'Artist') {
    // Example: show all for now, could group by artist
  } else if (activeTab === 'Random') {
    filteredImages = images.sort(() => 0.5 - Math.random());
  } // Add more logic for other tabs as needed

  return (
    <div className="App">
      <h1 className="phunkism-title">Phunkism</h1>
      {/* Main Tabs */}
      <div className="main-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`main-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => { setActiveTab(tab); setSelectedImage(null); }}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Trope Sub-Tabs */}
      {activeTab === 'Trope' && (
        <div className="trope-subtabs">
          {TROPE_SUBTABS.map(subtab => (
            <button
              key={subtab}
              className={`trope-subtab${activeTrope === subtab ? ' active' : ''}`}
              onClick={() => { setActiveTrope(subtab); setSelectedImage(null); }}
            >
              {subtab}
            </button>
          ))}
        </div>
      )}
      {/* Image Grid or Detail View */}
      {!selectedImage ? (
        <div className="image-grid">
          {filteredImages.map((img, idx) => (
            <div key={idx} className="image-thumb" onClick={() => setSelectedImage(img)}>
              <img src={img.url} alt={img.title} />
              <div className="image-title">{img.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="image-detail">
          <button className="back-btn" onClick={() => setSelectedImage(null)}>&larr; Back</button>
          <img src={selectedImage.url} alt={selectedImage.title} className="detail-img" />
          <div className="detail-info">
            <div><strong>Title:</strong> {selectedImage.title}</div>
            <div><strong>Artist:</strong> {selectedImage.artist}</div>
            <div><strong>Trope:</strong> {selectedImage.trope}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
