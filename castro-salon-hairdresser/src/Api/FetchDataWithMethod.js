export const fetchDataWithMethod = async (url, method, options) => {


  try {

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });

    if(!response.ok) {
      throw new Error('Could not fetch data from ' + url);
    }

    if( method !== 'DELETE') {
      const fetchedData = await response.json();

      return fetchedData

    }


  } catch (err) {
    console.error(err.message);
  }
};
