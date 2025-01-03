import { Link } from "react-router-dom";

const Breadcamp = ({ links, isDash = true }) => {
  return (
    <div className="flex items-center justify-end flex-wrap md:text-lg sm:text-base text-sm px-2">
      {isDash && (
        <>
          <Link
            key={0}
            className="font-semibold underline mx-1"
            to={`/dashboard`}
          >
            Armaturenbrett
          </Link>
          {"/"}
        </>
      )}

      {links?.map((l, i) => (
        <div key={i}>
          {i === links?.length - 1 ? (
            <span className="font-medium mx-1 text-slate-900">{l.name}</span>
          ) : (
            <Link
              className="font-semibold underline mx-1 capitalize"
              to={isDash ? `/dashboard/${l.link}` : `${l.link}`}
            >
              {l.name}
            </Link>
          )}
          {i !== links.length - 1 && "/"}
        </div>
      ))}
    </div>
  );
};

export default Breadcamp;
