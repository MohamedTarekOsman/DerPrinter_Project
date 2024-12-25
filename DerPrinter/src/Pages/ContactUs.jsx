import ContactHeader from '../components/ContactUs/ContactHeader/ContactHeader';
import ContactLeftSide from '../components/ContactUs/ContactLeftSide/ContactLeftSide';
import ContactUsForm from '../components/ContactUs/ContactUsForm/ContactUsForm';

const ContactUs = () => {
  return (
    <>
      <div className="container">
        <ContactHeader />
      </div>
      <div className="contact-info-and-form">
        <div className="container">
          <ContactLeftSide />
          <ContactUsForm />
        </div>
      </div>
      {/* <iframe className="w-[90%] h-[700px] m-auto my-10" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.0340013483265!2d13.76988492398337!3d51.05245997171338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709cf4cf16b26ed%3A0x35bec5c9e787ec79!2zR2Vyb2tzdHJhw59lIDMyLCAwMTMwNyBEcmVzZGVuLCDYo9mE2YXYp9mG2YrYpw!5e0!3m2!1sar!2seg!4v1734889994526!5m2!1sar!2seg"/> */}
    </>
  )
}

export default ContactUs