import React from 'react';
import './ContactHeader.css'

const ContactHeader = ({className, title, desc}) => {
  return (
    <div className={`contact-header ${className}`}>
        <h1>{!title?"Kontaktieren Sie uns":title}</h1>
        <p>
            {!desc?"Wir freuen uns, von Ihnen zu hören! Egal, ob Sie Fragen zu unseren Produkten haben, eine Sonderanfertigung benötigen oder einfach nur Hallo sagen möchten, erreichen Sie uns über das Kontaktformular oder die unten stehenden Angaben.":desc}
        </p>
    </div>
  )
}

export default ContactHeader