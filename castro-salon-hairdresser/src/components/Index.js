import React, {useState, useEffect, Fragment} from 'react'
import Banner from './Banner';

const Index = () => {

  const [info ,setInfo] = useState([]);

  useEffect(() => {

    if ( localStorage.getItem('storageDate')) {
      const date = localStorage.getItem('storageDate');
      checkDataAgeToCleanLocaleStorage (date);
     }

    getInfo();

  }, [info.length]);


  const fetchData = async url => {

    try {

      const response = await fetch(url);

      if(!response.ok) {
        throw new Error();
      }

      const fetchedData = await response.json();

      setInfo(fetchedData);

      return fetchedData;

    } catch (err) {

      console.log(err.message);
    }
  }

  const checkDataAgeToCleanLocaleStorage = date => {
    const today = new Date(Date.now()).getDate();
    const dataDate = new Date(parseInt(date)).getDate()

    if (today - dataDate <= 2) {
      localStorage.clear()
      localStorage.setItem('storageDate', Date.now());
    }

  }

  const getInfo = async () => {

    if (localStorage.getItem('info')) {

      const storage = JSON.parse(localStorage.getItem('info'));

      setInfo(storage);

    } else {

      const response = await fetchData('http://127.0.0.1:8000/api/text_intros');

      localStorage.setItem('info', JSON.stringify(response));
      if ( !localStorage.getItem('storageDate') ) {
        localStorage.setItem('storageDate', Date.now());
      }
    }
  }


  const title = info?.["hydra:member"]?.[0]?.title;
  const text = info?.["hydra:member"]?.[0]?.text;

  const displayInfo =  (

    <Fragment>
      <h2>{title}</h2>
      <p>{text}</p>
    </Fragment>

  )

  return (

    <div>
      <Banner />
      {
        displayInfo
      }
    </div>
  )
}

export default Index
