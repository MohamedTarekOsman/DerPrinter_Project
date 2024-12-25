import React from 'react';
import './ContactMethod.css'

const ContactMethod = ({img, key, value, title, imgAlt}) => {
  return (
    <div className='contact-method' key={key}>
        {
            img&&(
                <div className="method-image">
                    <img src={img} alt={imgAlt}/>
                </div>
            )
        }
        <div className="method-info">
            <p className='method-title'>{title}</p>
              <span>{value}</span>
        </div>
    </div>
  )
}

export default ContactMethod