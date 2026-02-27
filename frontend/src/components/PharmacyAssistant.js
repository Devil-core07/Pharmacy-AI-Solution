import React, { useState } from 'react';
import '../styles/PharmacyAssistant.css';

function PharmacyAssistant() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setAnswer('');
        try {
            const response = await fetch('http://localhost:5000/api/pharmacy/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });
            if (!response.ok) {
                throw new Error('Failed to get answer');
            }
            const data = await response.json();
            setAnswer(data.answer);
            setQuestion('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pharmacy-assistant">
            <h2>Ask Pharmacy Questions</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask your pharmacy question here..." rows="5" disabled={loading} />
                <button type="submit" disabled={loading || !question.trim()}>
                    {loading ? 'Getting Answer...' : 'Ask'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {answer && <div className="answer"><h3>Answer:</h3><p>{answer}</p></div>}
        </div>
    );
}

export default PharmacyAssistant;