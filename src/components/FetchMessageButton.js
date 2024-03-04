// In components/FetchMessageButton.js
import React, { useState } from 'react';
import { fetchMessageFromBackend } from '../services/BackendService'; // Adjust the import path as necessary

function FetchMessageButton() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getMessage = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await fetchMessageFromBackend();
            setMessage(data.message);
        } catch (error) {
            setError('Failed to fetch message. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {message && <p>{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <button onClick={getMessage}>Fetch Message</button>
                </>
            )}
        </div>
    );
}

export default FetchMessageButton;
