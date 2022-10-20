import React, { Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

const Brand = () => {

  const brands = [

      {
        id: 1,
        name: 'Previa',
        link: 'https://www.previa.it/fr/',
        image: 'https://i.pinimg.com/originals/bd/8d/53/bd8d53f4aee9b178c28bf790cfebc6e5.jpg'
      },

      {
        id: 2,
        name: 'pH haircare',
        link: 'https://www.phlaboratories.com/en/',
        image: 'https://www.phlaboratories.com/modules/ps_imageslider/images/049d79baf0f6d0bcf4ab50044f35c93b74179d84_HEADER%202.png'
      },
      {
        id: 3,
        name: 'Startec Paris',
        link: 'https://www.startec-paris.com/',
        image: 'https://monshowroombeaute.com/wp-content/uploads/2020/05/startec-duo-roucou.jpg'
      }
  ]





  return (
    <Fragment >

    <div className="bubble3"></div>

    <h2 className='text-end mx-5 my-4' style={{fontFamily: 'Fasthand, recursive'}}>Les produits que j'utilises pour vous</h2>

    <div className="d-flex justify-content-center">
      <div className='cards m-3'>

      {
        brands.map(({id, name, link,  image})=> {

          return (

              <div  key={id} className='cards-category' style={{ backgroundImage: `url(${image})`}}></div>

          )
        })
      }
    </div>
  </div>





        <Container className='d-flex justify-content-center'>

              <Carousel fade className='w-75 carousel-container'  >

                {
                  brands.map(({id, name, link, image}) => {

                    return (

                      <Carousel.Item interval={5000} key={(id * 2).toString()}>
                        <img
                          className="d-block w-100"
                          src={image}
                          alt="First slide"
                        />

                      </Carousel.Item>

                    )
                  })
                }
              </Carousel>

      </Container>

    </Fragment>

  )
}

export default Brand
