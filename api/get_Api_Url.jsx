const getApiUrl = (endpoint = '') => {
    let baseUrl;
  
    if (typeof window !== 'undefined') { 
      baseUrl = 'http://localhost:5001'; 
    } else {
      baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';
      console.warn('Running outside a browser, using default or env base URL:', baseUrl);
    }
  
    return `${baseUrl}${endpoint}`; 
  };
  
  export default getApiUrl;
  