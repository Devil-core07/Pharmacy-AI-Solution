import React, { useState } from 'react';
import '../styles/DrugInteractions.css';

function DrugInteractions() {
    const [drugs, setDrugs] = useState('');
    const [interactions, setInteractions] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setInteractions('');
        try {
            const drugList = drugs.split(',').map(d => d.trim()).filter(d => d);
            if (drugList.length < 2) {
                throw new Error('Please enter at least 2 drugs');
            }
            const response = await fetch('http://localhost:5000/api/drugs/interactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ drugs: drugList }),
            });
            if (!response.ok) {
                throw new Error('Failed to check interactions');
            }
            const data = await response.json();
            setInteractions(data.interactions);
            setDrugs('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="drug-interactions">
            <h2>Check Drug Interactions</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={drugs} onChange={(e) => setDrugs(e.target.value)} placeholder="Enter drugs separated by commas (e.g., Aspirin, Ibuprofen, Paracetamol)" rows="3" disabled={loading} />
                <button type="submit" disabled={loading || !drugs.trim()}>
                    {loading ? 'Checking...' : 'Check Interactions'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {interactions && <div className="interactions"><h3>Interactions:</h3><p>{interactions}</p></div>}
        </div>
    );
}

export default DrugInteractions;