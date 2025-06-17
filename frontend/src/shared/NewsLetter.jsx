import React from 'react'
import './news-letter.css'
import maleTourist from '../assets/images/male-tourist.png'

function NewsLetter() {
  return (
    <section className='newsletter'>
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="newsletter__content">
                        <h2>Subscribe now to get useful travelling information</h2>

                        <div className="newsletter__input">
                            <input type="email" placeholder='Enter your email' />
                            <button className="btn newsletter__btn">Subscribe</button>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione eum similique molestias aliquid perferendis.</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="newsletter__img">
                        <img src={maleTourist} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NewsLetter