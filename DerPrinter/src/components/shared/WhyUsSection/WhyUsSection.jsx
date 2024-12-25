import slideOne from '../../../assets/images/1.png';
import slide2 from '../../../assets/images/2.png';
import slide3 from '../../../assets/images/3.png';

function WhyUsSection() {
  const cards = [
    {
      image: slideOne, // رابط الصورة الأولى
      title: "Einfachheit trifft Expertise",
      description:
        "Unser benutzerfreundliches Online-Tool ermöglicht es Ihnen, Ihre Designs intuitiv zu gestalten – ganz ohne Vorkenntnisse. Gleichzeitig steht Ihnen unser erfahrenes Team zur Seite, falls Sie Hilfe oder Inspiration benötigen.",
    },
    {
      image: slide2, // رابط الصورة الثانية
      title: "Vielseitige Produktpalette",
      description:
        "Von klassischem Druck auf hochwertigen Papieren bis hin zu modernen Werbegeschenken und personalisierten Artikeln: Unsere Produktwelt lässt keine Wünsche offen. Für jedes Projekt finden Sie bei uns die passende Lösung.",
    },
    {
      image: slide3, // رابط الصورة الثالثة
      title: "Qualität, die überzeugt",
      description:
        "Ob im Design, der Materialauswahl oder der Produktion – wir legen Wert auf Perfektion in jedem Detail. Unsere Druckerzeugnisse stehen für Langlebigkeit und eine professionelle Präsentation.",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Warum <span className="text-indigo-600">Derprinter?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center text-center group"
            >
              <div className="relative w-full h-80 overflow-hidden mb-4">
                <img
                  
                  src={card.image}
                  alt={card.title}
                  className="animated-img w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                />
              </div>
              <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
