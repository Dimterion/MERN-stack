import { archives } from "../assets/aboutPageContent";

export default function Archives() {
  const displayedArchives = archives.map((archive) => {
    return (
      <article
        key={archive.id}
        className="archives-article text-center border-2 pb-4 my-4 overflow-hidden"
      >
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
    <article className="flex flex-row flex-wrap justify-around">
      {displayedArchives}
    </article>
  );
}
