/* eslint-disable react/prop-types */
import "./AboutSection.css"; 
import aboutImage from '../../../assets/images/about-us.png'

const AboutUs = ({data}) => {
  
  // const {description1, description2, image, subtitle, title,} = data
  return (
    <div className="container about-us-container py-20s">
      <div className="image-section">
        <img
          src={data?.image?data.image:aboutImage}
          alt="Printing process"
          className="about-us-image"
        />
      </div>
      <div className="text-section">
        <h2 className="text-ceonter">{data?.title?data.title:"über uns"}</h2>
        <h4 className="text-ceonter">{data?.subTitle?data.subTitle:"Wo Qualität auf Kreativität trifft"}</h4>
        <div className="text-content">
          <p className="desc">
            {data?.description1
?data.description1
:
              "Willkommen bei Derprinter – Dein Kreativer Druckpartner Online Bei Derprinter verstehen wir, dass deine Druckprojekte mehr als nur Tinte auf Papier sind – sie sind Ausdruck deiner Kreativität und Vision."
            }
          </p>
          <p className="desc">
            {
              data?.description2?data.description2:
              "Egal, ob es sich um Flyer, Visitenkarten oder maßgeschneiderteProjekte handelt, wir sind hier, um deine Ideen zum Strahlen zubringen."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
