import { archives } from "../assets/aboutPageContent";

export default function Archives() {
  const displayedArchives = archives.map((archive) => {
    return (
      <div key={archive.id}>
        <a target="_blank" rel="noreferrer" href={archive.link}>
          {archive.name}
        </a>
      </div>
    );
  });

  return (
    <article className="flex flex-row flex-wrap justify-around">
      {displayedArchives}
    </article>
  );
}
