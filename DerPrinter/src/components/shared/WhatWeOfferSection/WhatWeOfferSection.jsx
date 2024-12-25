import React from "react";
import icon1 from '../../../assets/svg/about--1.svg';
import icon2 from '../../../assets/svg/about--2.svg';
import icon3 from '../../../assets/svg/about--3.svg';



function WhatWeOfferSection() {
  
  const offers = [
    {
      icon: icon1, // استبدل هذا الرابط برمزك المخصص
      title: "Hochwertiger Druck",
      description:
        "Außergewöhnliche Ergebnisse für Broschüren, Banner, Visitenkarten und individuelle Designs.",
    },
    {
      icon: icon2, // استبدل هذا الرابط برمزك المخصص
      title: "Umweltfreundliche Praktiken",
      description:
        "Nachhaltige Materialien und Abfallreduzierung für eine grünere Zukunft.",
    },
    {
      icon: icon3, // استبدل هذا الرابط برمزك المخصص
      title: "Kundenorientierter Service",
      description:
        "Maßgeschneiderte Lösungen, um Ihre Vision zum Leben zu erwecken.",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-8 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Was wir bieten</h2>
        <p className="text-gray-600 text-sm md:text-lg mb-12">
          „Wir bieten innovative, nachhaltige und maßgeschneiderte
          Drucklösungen, die Ihren individuellen Anforderungen gerecht werden.“
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 mb-4">
                <img
                  src={offer.icon}
                  alt={offer.title}
                  className="w-100 h-100"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
              <p className="text-sm text-gray-600">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeOfferSection;
