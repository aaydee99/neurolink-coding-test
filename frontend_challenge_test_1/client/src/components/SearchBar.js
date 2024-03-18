import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]); // Ensure initial state is an array
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    if (query.length === 0) {
      setPatients([]);
      setIsSearching(false);
      setError(''); // Clear any errors
    } else {
      setIsSearching(true);
      setError(''); // Clear errors before fetching
      axios.get(`http://localhost:3001/search?q=${query}`)
        .then(response => {
          setPatients(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch patients.'); // Set error message
          setPatients([]); // Ensure patients is reset to an array on error
        })
        .finally(() => setIsSearching(false));
    }
  }, [query]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for patients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <div className="text-red-500">{error}</div>} {/* Display error message if any */}
      <ul className="mt-4">
        {isSearching ? (
          <li className="text-gray-500">Searching...</li>
        ) : Array.isArray(patients) && patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient._id} className="py-2 px-4 hover:bg-gray-100 rounded transition-colors duration-150 ease-in-out">
              {patient.name}
            </li>
          ))
        ) : (
          !isSearching && query && <li className="text-gray-500">No patients found.</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;