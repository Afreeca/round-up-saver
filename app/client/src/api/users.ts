const apiUrl = process.env.REACT_APP_SERVER_URL;

export const getAccounts = async (): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/accounts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
};