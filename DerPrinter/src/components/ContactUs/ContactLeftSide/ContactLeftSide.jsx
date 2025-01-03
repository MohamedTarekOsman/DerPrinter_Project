import ContactHeader from '../ContactHeader/ContactHeader';
import phone from '../../../assets/svg/phone-call-contact.svg';
// import location from '../../../assets/svg/location.svg';
import gmail from '../../../assets/svg/gmail.svg';
import ContactMethod from '../ContactMethod/ContactMethod';
import FollowUs from '../FollowUS/FollowUs';

const ContactLeftSide = () => {
  const contactInfo = [
    // {
    //   icon: location,
    //   title: "Adresse",
    //   description: (
    //     <>
    //       Gerok Str. 32 <br />
    //       01307 Dresden
    //     </>
    //   ),
    //   imgAlt: "Location Icon"
    // },
    {
      icon: phone,
      title: "Telefonnummer",
      description: (
        <>
          +0163 3503501
        </>
      ),
      imgAlt: "Phone Icon"
    },
    {
      icon: gmail,
      title: "E-Mail",
      description: (
        <>
          info@derprinter.de
        </>
      ),
      imgAlt: "SMS Icon"
    },
  ];
      
  return (
    <div className="contact-info-text">
        <ContactHeader 
            className={"contact-form-desc"}
            title={"Sprechen Sie mit uns"}
            desc={"Unser Team ist von Montag bis Freitag, 10:00 bis 16:00 Uhr, für Sie da. Sie erreichen uns telefonisch unter 0163 3503501, per Mail oder über unser Kontaktformular.Haben Sie Fragen zu unseren Produkten, zur Erstellung von Druckdaten, den aktuellen Lieferzeiten oder wünschen eine ausführliche Beratung? Unsere Expertinnen und Experten stehen Ihnen mit Rat und Tat zur Seite und helfen Ihnen gerne weiter"}
        />
        <div className="methods">
            {
                contactInfo.map((item, index)=>(
                    <ContactMethod 
                        key={index}
                        img={item.icon}
                        title={item.title}
                        value={item.description}
                        imgAlt={item.imgAlt}
                    />
                ))
            }
        </div>
        <FollowUs />
    </div>
  )
}

export default ContactLeftSide