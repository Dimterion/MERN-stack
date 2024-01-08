import { useState } from "react";
import Header from "../components/Header";
import Skills from "../components/Skills";
import Objectives from "../components/Objectives";
import Archives from "../components/Archives";
import Overview from "../components/Overview";

export default function About() {
  const [tab, setTab] = useState("skills");
  const [skillName, setSkillName] = useState("");

  return (
    <>
      <Header />
      <section className="about-section">
        <nav className="flex items-center justify-center md:justify-between gap-4 flex-wrap px-2 my-6">
          <ul className="about-ul uppercase flex justify-center gap-2 flex-wrap">
            <li
              className={
                tab === "skills" ? "about-ulLiActive" : "hover:opacity-80"
              }
              onClick={() => setTab("skills")}
            >
              Skills
            </li>
            <li
              className={
                tab === "objectives" ? "about-ulLiActive" : "hover:opacity-80"
              }
              onClick={() => setTab("objectives")}
            >
              Objectives
            </li>
            <li
              className={
                tab === "archives" ? "about-ulLiActive" : "hover:opacity-80"
              }
              onClick={() => setTab("archives")}
            >
              Archives
            </li>
            <li
              className={
                tab === "overview" ? "about-ulLiActive" : "hover:opacity-80"
              }
              onClick={() => setTab("overview")}
            >
              Overview
            </li>
          </ul>
          <div>9,001 / 10,000 XP</div>
        </nav>
        <section className="mb-4">
          {tab === "skills" && (
            <Skills skillName={skillName} setSkillName={setSkillName} />
          )}
          {tab === "objectives" && <Objectives />}
          {tab === "archives" && <Archives />}
          {tab === "overview" && <Overview />}
        </section>
      </section>
    </>
  );
}
