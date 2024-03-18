import React, { useState } from 'react';
import { fetchApiData } from '../services/PatientService';

function PatientDataFetcher() {
  const [endpointPath, setEndpointPath] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = () => {
    if (!endpointPath) {
      alert('Please enter an endpoint path');
      return;
    }

    setLoading(true);
    fetchApiData(endpointPath)
      .then(data => {
        setApiResponse(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  };

  const renderJson = (data, prefix = '') => {
    if (typeof data === 'object' && data !== null) {
      return Object.keys(data).map((key) => (
        <div key={prefix + key}>
          <strong>{key}:</strong> {renderJson(data[key], `${prefix}${key}.`)}
        </div>
      ));
    }
    return <span>{data.toString()}</span>;
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          value={endpointPath}
          onChange={(e) => setEndpointPath(e.target.value)}
          placeholder="Enter Endpoint Path (e.g., 'patients/12')"
          style={{ padding: '10px', marginRight: '8px' }}
        />
        <button onClick={handleFetchData} disabled={loading} style={{ padding: '10px' }}>
          Fetch Data
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {apiResponse && (
        <div>
          <h2>API Response</h2>
          <div className="api-response">{renderJson(apiResponse)}</div>
        </div>
      )}
    </div>
  );
}

export default PatientDataFetcher;
