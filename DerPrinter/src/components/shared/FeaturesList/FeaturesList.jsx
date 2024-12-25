import Feature from "../Feature/Feature";
import check from '../../../assets/svg/shield-check 1.svg';
import edit from '../../../assets/svg/customize-edit 1.svg';
import time from '../../../assets/svg/time-fast 1.svg';
import badge from '../../../assets/svg/badge-percent 1.svg';
import bio from '../../../assets/svg/bio-leaves 1.svg';
import user from '../../../assets/svg/user-headset 1.svg';

const features = [
  {
    icon: check,
    title: "Premium-Qualität für jeden Druck",
    description: "Freuen Sie sich auf leuchtende Farben und gestochen scharfe Details – dank hochwertiger Materialien und moderner Drucktechnologie."
  },
  {
    icon: edit,
    title: "Schnelle & Zuverlässige Lieferung",
    description: "Durch unsere effiziente Produktion und schnellen Versandoptionen erhalten Sie Ihre Bestellung pünktlich – ideal für enge Deadlines und regelmäßige Aufträge."
  },
  {
    icon: time,
    title: "Umweltfreundliche Optionen",
    description: "Wählen Sie nachhaltige Druckoptionen, darunter recyceltes Papier und umweltfreundliche Verfahren, um Ihren ökologischen Fußabdruck zu verringern."
  },
  {
    icon: badge,
    title: "Einfache Online-Anpassung",
    description: "Passen Sie Ihr Design ganz einfach mit unseren benutzerfreundlichen Tools an oder laden Sie Ihre eigene Vorlage hoch, um sicherzustellen, dass jedes Detail stimmt."
  },
  {
    icon: bio,
    title: "Erschwingliche Preise mit Mengenrabatten",
    description: "Profitieren Sie von einem ausgezeichneten Preis-Leistungs-Verhältnis mit zusätzlichen Rabatten bei größeren Bestellungen – perfekt für Unternehmen und Veranstaltungen."
  },
  {
    icon: user,
    title: "Engagierter Kundenservice",
    description: "Unser freundliches Support-Team steht Ihnen jederzeit zur Verfügung, um Ihre Fragen zu beantworten und ein zufriedenstellendes Erlebnis von Anfang bis Ende zu gewährleisten."
  }
];

const FeaturesList = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-6">
        Ihre Vorteile beim Online-Drucken mit <span className="text-gray-600">DerPrinter</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 container">
        {features.map((feature, index) => (
          <Feature
            feature={feature}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;
