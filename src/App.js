import './App.css';
import React, { useState, useEffect } from 'react';

const TABS = ['Random', 'Chronological', 'Artist', 'Trope', 'Newest'];
const TROPE_SUBTABS = ['Mash-up', 'Cropping', 'Visual Culture', 'Art Reference'];
const ARTIST_SUBTABS = ['Vert'];  // Add more artists here as needed

// Example image data with varying aspect ratios
const images = [
  {
    url: '/homer.PNG',
    artist: 'Arkanaruzain',
    trope: 'Visual Culture',
    title: '"Homer Simpson Backing Into a Hedge"',
    size: '984 x 984px',
    created: '5-03-2025',
  },
  {
    url: '/green_candle.PNG',
    artist: 'Vert',
    trope: 'Art Reference',
    title: '"Green Candle"',
    size: '984 x 984px',
    created: '4-26-2025',
  },
  {
    url: '/red_candle.PNG',
    artist: 'Vert',
    trope: 'Art Reference',
    title: '"Red Candle"',
    size: '984 x 984px',
    created: '5-03-2025',
  },
  {
    url: '/shitman.PNG',
    artist: 'Vert',
    trope: 'Art Reference',
    title: '"Shitman"',
    size: '984 x 984px',
    created: '5-03-2025',
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('Random');
  const [activeTrope, setActiveTrope] = useState(TROPE_SUBTABS[0]);
  const [activeArtist, setActiveArtist] = useState(ARTIST_SUBTABS[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImages, setFilteredImages] = useState([]);

  // Handle modal open/close
  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [selectedImage]);

  // Filter images based on active tab and sub-tab
  useEffect(() => {
    const randomizeImages = () => {
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      setFilteredImages(shuffled);
    };

    if (activeTab === 'Random') {
      randomizeImages();
    } else if (activeTab === 'Trope') {
      setFilteredImages(images.filter(img => img.trope === activeTrope));
    } else if (activeTab === 'Artist') {
      setFilteredImages(images.filter(img => img.artist === activeArtist));
    } else {
      setFilteredImages(images);
    }
  }, [activeTab, activeTrope, activeArtist]);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

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
      {/* Artist Sub-Tabs */}
      {activeTab === 'Artist' && (
        <div className="trope-subtabs">
          {ARTIST_SUBTABS.map(artist => (
            <button
              key={artist}
              className={`trope-subtab${activeArtist === artist ? ' active' : ''}`}
              onClick={() => { setActiveArtist(artist); setSelectedImage(null); }}
            >
              {artist}
            </button>
          ))}
        </div>
      )}
      {/* Image Grid */}
      <div className="image-grid">
        {filteredImages.map((img, idx) => (
          <div 
            key={idx} 
            className="image-thumb" 
            onClick={() => setSelectedImage(img)}
            onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            <img 
              src={img.url} 
              alt={img.title} 
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedImage && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <div className="modal-grid">
              <div className="modal-image-container">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="modal-image"
                />
              </div>
              <div className="modal-info">
                <h2 className="modal-title">{selectedImage.title}</h2>
                <div className="modal-meta-item">
                  <span className="modal-label">ARTIST</span>
                  <span className="modal-value">{selectedImage.artist}</span>
                </div>
                <div className="modal-meta-item">
                  <span className="modal-label">TROPE</span>
                  <span className="modal-value">{selectedImage.trope}</span>
                </div>
                <div className="modal-meta-item">
                  <span className="modal-label">CREATED</span>
                  <span className="modal-value">{selectedImage.created}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
