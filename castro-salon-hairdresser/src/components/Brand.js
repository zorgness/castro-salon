import React, { Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

const Brand = () => {

  const brands = ['https://www.dealsshutter.com/blog/wp-content/uploads/2021/10/hair-care-products-in-india.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLHaSCQC5E0rvOZNKU1he_l2OLz5nBoGP5g&usqp=CAU',
  'https://helloglow.co/wp-content/uploads/2017/06/rahua.jpg']



  return (
    <Fragment>

    <h2 className='text-start mx-5 my-3' style={{fontFamily: 'Fasthand, recursive'}}>Les produits que j'utilises pour vous</h2>

    <div className="d-flex justify-content-center">
      <div className='cards m-3'>

      {
        brands.map(brand => {

          return (

              <div  key={brands.indexOf(brand)} className='cards-category' style={{ backgroundImage: `url(${brand})`}}></div>

          )
        })
      }
    </div>
  </div>



        <Container className='d-flex justify-content-center'>

              <Carousel fade className='w-75 carousel-container'  >

                {
                  brands.map((brand) => {

                    return (

                      <Carousel.Item interval={5000} key={(brands.indexOf(brand) * 2).toString()}>
                        <img
                          className="d-block w-100"
                          src={brand}
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
