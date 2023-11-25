import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import Header from "../components/Header";

export default function About() {
  const [tab, setTab] = useState("skills");

  return (
    <>
      <Header />
      <nav className="flex items-center justify-between flex-wrap px-2">
        <ul className="about-ul uppercase flex gap-2 flex-wrap">
          <li
            className={tab === "skills" ? "about-ulLiActive" : ""}
            onClick={() => setTab("skills")}
          >
            Skills
          </li>
          <li
            className={tab === "objectives" ? "about-ulLiActive" : ""}
            onClick={() => setTab("objectives")}
          >
            Objectives
          </li>
          <li
            className={tab === "archives" ? "about-ulLiActive" : ""}
            onClick={() => setTab("archives")}
          >
            Archives
          </li>
          <li
            className={tab === "map" ? "about-ulLiActive" : ""}
            onClick={() => setTab("map")}
          >
            Map
          </li>
        </ul>
        <div>9,001 / 10,000 XP</div>
      </nav>
      <section>
        {tab === "skills" && (
          <article className="flex flex-row flex-wrap justify-between mx-2">
            <div>
              <div className="flex gap-4 m-4 flex-wrap justify-between">
                <div>HTML</div>
                <div className="flex gap-1">
                  <div className="about-cubeActive"></div>
                  <div className="about-cubeActive flex flex-col items-center justify-center">
                    <FaAngleUp />
                  </div>
                  <div className="about-cubeActive"></div>
                  <div className="about-cubeActive flex flex-col items-center">
                    <FaAngleUp />
                    <FaAngleUp />
                  </div>
                  <div className="about-cubeActive"></div>
                  <div className="about-cubeActive flex flex-col items-center">
                    <FaAngleUp />
                    <FaAngleUp />
                    <FaAngleUp />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 m-4 flex-wrap justify-between">
                <div>CSS</div>
                <div className="flex gap-1">
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                </div>
              </div>
              <div className="flex gap-4 m-4 flex-wrap justify-between">
                <div>JavaScript</div>
                <div className="flex gap-1">
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                  <div className="about-cube"></div>
                </div>
              </div>
            </div>
            <div>Info</div>
          </article>
        )}
        {tab === "objectives" && <>objectives</>}
        {tab === "archives" && <>archives</>}
        {tab === "map" && <>map</>}
      </section>
    </>
  );
}
