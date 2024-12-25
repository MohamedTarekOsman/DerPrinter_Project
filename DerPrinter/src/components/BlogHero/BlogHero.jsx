import hero from '../../assets/images/blogHero.png'

const BlogHero = () => {
  return (
    <div className="container pb-20">
        <div className="blog-hero flex flex-col md:flex-row items-center bg-gray-100 rounded-xl shadow-lg">
      {/* النصوص */}
      <div className="flex-1 blog-hero-text p-12">
        <p className="text-sm text-red-600 font-semibold uppercase">
          Inspiration, Neuigkeiten
        </p>
        <h2 className="text-xl font-bold mt-2">
          Leitfaden zu Visitenkartengröße und -abmessungen
        </h2>
        <p className="text-gray-600 mt-4">
          In diesem Leitfaden erfahren Sie alles, was Sie über die Größe und
          Abmessungen von Visitenkarten wissen müssen.
        </p>
        <button className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Lesen
        </button>
      </div>
      <div className="flex-1 blog-hero-img">
        <img
          src={hero}
          alt="Visitenkarten"
          className="rounded-xl w-full h-auto"
        />
      </div>
    </div>
    </div>
  );
};

export default BlogHero;
