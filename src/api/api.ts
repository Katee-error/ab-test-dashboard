const BASE_URL = 'http://localhost:3100';
const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return null;
  }
};

export const getTests = () => fetchData('/tests');            
export const getTestById = (id: string) => fetchData(`/tests/${id}`); 


export const getSites = () => fetchData('/sites');            
export const getSiteById = (id: string) => fetchData(`/sites/${id}`);
