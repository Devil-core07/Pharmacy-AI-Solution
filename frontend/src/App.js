import React, { useState } from 'react';
import './App.css';
import PharmacyAssistant from './components/PharmacyAssistant';
import DrugInteractions from './components/DrugInteractions';

function App() {
  const [activeTab, setActiveTab] = useState('pharmacy');

  return (
    <div className="App">
      <header className="App-header">
        <h1>💊 Pharmacy AI Solution</h1>
        <p>Your AI-Powered Pharmacy Assistant</p>
      </header>
      <nav className="tabs">
        <button className={activeTab === 'pharmacy' ? 'active' : ''} onClick={() => setActiveTab('pharmacy')}> 
          Ask Pharmacy Question
        </button>
        <button className={activeTab === 'drugs' ? 'active' : ''} onClick={() => setActiveTab('drugs')}> 
          Check Drug Interactions
        </button>
      </nav>
      <main className="content">
        {activeTab === 'pharmacy' && <PharmacyAssistant />}
        {activeTab === 'drugs' && <DrugInteractions />}
      </main>
    </div>
  );
}

export default App;