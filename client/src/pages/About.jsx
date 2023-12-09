import { useState } from "react";
import Header from "../components/Header";
import Skills from "../components/Skills";
import Objectives from "../components/Objectives";

export default function About() {
  const [tab, setTab] = useState("skills");
  const [skillName, setSkillName] = useState("");

  return (
    <>
      <Header />
      <div className="signIn-section">
        <nav className="flex items-center justify-between flex-wrap px-2 my-6">
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
            <Skills skillName={skillName} setSkillName={setSkillName} />
          )}
          {tab === "objectives" && <Objectives />}
          {tab === "archives" && <>archives</>}
          {tab === "map" && <>map</>}
        </section>
      </div>
    </>
  );
}
