import React from 'react'
import ServiceCard from './ServiceCard'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const serviceData = [
    {
        imgUrl: weatherImg,
        title: "Calculate Weather",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
    },
]

function ServiceList() {
  return (
    <>
        {serviceData.map((item,index)=> (
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}><ServiceCard item={item}/></div>
        ))}
    </>
  )
}

export default ServiceList