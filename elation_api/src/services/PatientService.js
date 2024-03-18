import axios from 'axios';

export const fetchApiData = async (endpoint, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${process.env.REACT_APP_ELATION_API_BASE_URL}/${endpoint}${queryParams ? `?${queryParams}` : ''}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      // You might want to handle errors differently depending on your needs
      throw error;
    }
};
