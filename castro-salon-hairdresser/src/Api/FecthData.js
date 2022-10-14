export const fetchData = async (url) => {

  try {

    const response = await fetch(url);

    if(!response.ok) {
      throw new Error();
    }

    const fetchedData = await response.json();

    return fetchedData;

  } catch (err) {

    console.log(err.message);
  }
}
