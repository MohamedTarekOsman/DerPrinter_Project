import Feature from "../Feature/Feature";
import check from '../../../assets/svg/shield-check 1.svg';
import edit from '../../../assets/svg/customize-edit 1.svg';
import time from '../../../assets/svg/time-fast 1.svg';
import badge from '../../../assets/svg/user-intili.svg';
import bio from '../../../assets/svg/bio-leaves 1.svg';
import user from '../../../assets/svg/user-headset 1.svg';
import price from '../../../assets/svg/best-price 1.svg';

const features = [
  {
    icon: check,
    title: "Brillante Qualität, die auffällt",
    description: "Knallige Farben, gestochen scharfe Details und Materialien, die Eindruck machen. Jedes Produkt – ein Meisterstück. Wir setzen Maßstäbe, keine Grenzen."
  },
  {
    icon: edit,
    title: "Blitzschnell & zuverlässig",
    description: "Tick, Tack – die Deadline läuft! Mit uns bleibt Ihr Zeitplan on point. Turbo-Produktion, pünktliche Lieferung – für Ihre Projekte, egal wie knapp es wird."
  },
  {
    icon: time,
    title: "Nachhaltig, weil Zukunft zählt",
    description: "Recyceltes Papier, umweltfreundliche Prozesse – grün ist das neue Must-have. Mit DerPrinter drucken Sie nicht nur, Sie machen einen Unterschied."
  },
  {
    icon: badge,
    title: "Designen wie ein Profi – mit Canva!",
    description: "Kein Designer? Kein Problem! Mit der nahtlosen Integration von Canva erstellen Sie mühelos beeindruckende Designs – und das direkt in unserem Shop. Kreativ werden war noch nie so einfach."
  },
  {
    icon: bio,
    title: "100 % kreative Kontrolle",
    description: "Lassen Sie Ihrer Fantasie freien Lauf! Gestalten Sie mit unseren Tools oder laden Sie Ihre Vorlage hoch. Bei uns wird jede Idee Realität – genau so, wie Sie es sich vorstellen."
  },
  {
    icon: price,
    title: "Preise, die krachen",
    description: "Mehr bestellen, weniger zahlen – ganz einfach! Großaufträge? Events? Unternehmen? Wir lassen Sie sparen, ohne an Qualität zu sparen."
  },
  {
    icon: user,
    title: "Kundenservice, der rockt",
    description: "Fragen? Herausforderungen? Wünsche? Unser Support-Team lebt für Ihre Zufriedenheit. Schnell, freundlich, lösungsorientiert – genau so, wie Sie es verdienen."
  }
];

const FeaturesList = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-6">
      Warum Derprinter? Weil Standard nicht unser Standard ist.
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
