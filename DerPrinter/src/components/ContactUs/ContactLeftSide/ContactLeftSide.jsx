import ContactHeader from '../ContactHeader/ContactHeader';
import phone from '../../../assets/svg/phone-call-contact.svg';
import location from '../../../assets/svg/location.svg';
import gmail from '../../../assets/svg/gmail.svg';
import ContactMethod from '../ContactMethod/ContactMethod';
import FollowUs from '../FollowUS/FollowUs';

const ContactLeftSide = () => {
    const contactInfo = [
        {
          icon: location, // استبدل هذا بالمسار أو اسم الأيقونة المناسبة
          title: "Adresse",
          description: "Derzeit nicht verfügbar",
          imgAlt: "Location Icon"
        },
        {
          icon: phone, // استبدل هذا بالمسار أو اسم الأيقونة المناسبة
          title: "Telefonnummer",
          description: "+49 30 12345678",
          imgAlt: "Phone Icon"
        },
        {
          icon: gmail, // استبدل هذا بالمسار أو اسم الأيقونة المناسبة
          title: "E-Mail",
          description: "printservices@gmail.com",
          imgAlt: "SMS Icon"
        },
      ];
      
  return (
    <div className="contact-info-text">
        <ContactHeader 
            className={"contact-form-desc"}
            title={"Nehmen Sie Kontakt mit uns auf"}
            desc={"Wir freuen uns, von Ihnen zu hören! Egal, ob Sie Fragen zu unseren Produkten haben, eine Sonderanfertigung benötigen oder einfach nur Hallo sagen möchten, erreichen Sie uns über das Kontaktformular oder die unten stehenden Angaben."}
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
        <hr className='border-black border-solid my-5'/>
        <strong>Address</strong>
        <p>Gerok Str. 32 <br/> 01307 Dresden</p>
    </div>
  )
}

export default ContactLeftSide