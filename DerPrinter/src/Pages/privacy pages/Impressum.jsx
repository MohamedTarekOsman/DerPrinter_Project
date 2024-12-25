const Impressum = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Impressum</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
        <p className="mb-1"><strong>Anbieter dieser Website:</strong></p>
        <p>Derprinter</p>
        <p>Gerok Str. 32</p>
        <p>01307 Dresden</p>
        <p>Deutschland</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
        <p><strong>Telefon:</strong> +49 1633503501</p>
        <p><strong>E-Mail:</strong> <a href="mailto:info@derprinter.de" className="text-blue-500 hover:underline">info@derprinter.de</a></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Geschäftsführer</h2>
        <p>Mahmoud Najjar</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Umsatzsteuer-Identifikationsnummer</h2>
        <p>Gemäß § 27a UStG: <strong>DE370328278</strong></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Online-Streitbeilegung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a 
            href="http://ec.europa.eu/odr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            http://ec.europa.eu/odr
          </a>.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Urheberrecht und geistiges Eigentum</h2>
        <p>
          Alle Inhalte dieser Website, einschließlich Texte, Bilder, Grafiken und Logos, sind urheberrechtlich geschützt. Jede 
          unbefugte Nutzung, insbesondere die Vervielfältigung, Bearbeitung oder Verbreitung, ist untersagt.
        </p>
      </section>
    </div>
  );
};

export default Impressum;