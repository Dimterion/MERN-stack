import { archives } from "../assets/aboutPageContent";

export default function Archives() {
  const displayedArchives = archives.map((archive) => {
    return (
      <article key={archive.id} className="archives-article">
        <a target="_blank" rel="noreferrer" href={archive.link}>
          <img
            className="pb-4 hover:scale-105 transition-scale duration-300"
            src={archive.img}
            alt={archive.alt}
          />
          <p className="w-full h-full">{archive.name}</p>
        </a>
      </article>
    );
  });

  return (
    <>
      <article className="flex flex-row flex-wrap justify-around">
        {displayedArchives}
      </article>
      <div className="quote-container">
        <p className="text-lg underline">RoboQuote of the day:</p>
        <p className="text-lg text-center my-2 italic">Your move, creep.</p>
        <p className="text-sm w-[270px] max-w-[80vw]">
          (Software engineer after implementing 50 new features to a 10 year old
          program)
        </p>
      </div>
    </>
  );
}
