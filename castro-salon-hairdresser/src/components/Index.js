import React, {useState, useEffect, Fragment} from 'react'
import Banner from './Banner';
import { fetchData } from '../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../cleanStorage/CleanStorage'

const Index = () => {

  const [info ,setInfo] = useState([]);

  useEffect(() => {

    if (localStorage.getItem('storageDateHome')) {
      const date = localStorage.getItem('storageDateHome');
      checkDataAgeToCleanLocaleStorage(date);
     }

    return () => {
      getInfo();
    }

  }, []);



  const getInfo = async () => {

    console.log('storage index')
    if (localStorage.getItem('info')) {

      const storage = JSON.parse(localStorage.getItem('info'));

      setInfo(storage);

    } else {

      const fetchedData = await fetchData('http://127.0.0.1:8000/api/text_intros');

      setInfo(fetchedData);

      localStorage.setItem('info', JSON.stringify(fetchedData));
      if ( !localStorage.getItem('storageDateHome') ) {
        localStorage.setItem('storageDateHome', Date.now());
      }
    }
  }

  // console.log(info)

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
