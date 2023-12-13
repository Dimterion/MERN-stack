import { useState } from "react";
import Header from "../components/Header";
import Skills from "../components/Skills";
import Objectives from "../components/Objectives";
import Archives from "../components/Archives";
import Profile from "../components/Profile";

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
              className={tab === "profile" ? "about-ulLiActive" : ""}
              onClick={() => setTab("profile")}
            >
              Profile
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
          {tab === "profile" && <Profile />}
        </section>
      </div>
    </>
  );
}
