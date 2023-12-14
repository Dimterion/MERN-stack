import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import PropTypes from "prop-types";
import { skills } from "../assets/aboutPageContent";

export default function Skills({ skillName, setSkillName }) {
  const displayedSkills = skills.map((skill) => {
    return (
      <article
        className={
          skillName === skill.name && skill.name !== ""
            ? "skills-active flex flex-row flex-wrap items-center justify-between border-2 m-1 md:m-2"
            : "flex flex-row flex-wrap items-center justify-between m-1 md:m-2"
        }
        key={skill.id}
      >
        {skill.name !== "" && (
          <div
            onClick={() => {
              skillName !== "" && skillName === skill.name
                ? setSkillName("")
                : setSkillName(skill.name);
            }}
            className="about-skill flex gap-1 flex-wrap justify-between"
          >
            <div className="about-skillName uppercase">{skill.name}</div>
            <div className="flex gap-1 md:gap-2">
              <div
                className={skill.level > 0 ? "about-cubeActive" : "about-cube"}
              ></div>
              <div
                className={
                  skill.level > 1
                    ? "about-cubeActive flex flex-col items-center justify-center"
                    : "about-cube flex flex-col items-center justify-center"
                }
              >
                <FaAngleUp />
              </div>
              <div
                className={
                  skill.level > 2
                    ? "about-cubeActive flex flex-col items-center justify-center"
                    : "about-cube flex flex-col items-center justify-center"
                }
              ></div>
              <div
                className={
                  skill.level > 3
                    ? "about-cubeActive flex flex-col items-center justify-center"
                    : "about-cube flex flex-col items-center justify-center"
                }
              >
                <FaAngleUp />
                <FaAngleUp />
              </div>
              <div
                className={
                  skill.level > 4
                    ? "about-cubeActive flex flex-col items-center justify-center"
                    : "about-cube flex flex-col items-center justify-center"
                }
              ></div>
              <div
                className={
                  skill.level > 5
                    ? "about-cubeActive flex flex-col items-center justify-center"
                    : "about-cube flex flex-col items-center justify-center"
                }
              >
                <FaAngleUp />
                <FaAngleUp />
                <FaAngleUp />
              </div>
            </div>
          </div>
        )}
        {skillName === skill.name && skill.name !== "" && (
          <div className="w-2/4 ml-2">
            <div className="flex flex-wrap gap-2 my-2 items-center">
              <div className="about-cubeActive flex flex-col items-center justify-center">
                <FaAngleUp />
              </div>
              <div className="w-80">
                <h2 className="font-bold text-lg">Aspiring coder:</h2>
                <p>{skill.levelOneDesc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 my-2 items-center">
              <div className="about-cubeActive flex flex-col items-center justify-center">
                <FaAngleUp />
                <FaAngleUp />
              </div>
              <div className="w-80">
                <h2 className="font-bold text-lg">Seasoned programmer:</h2>
                <p>{skill.levelTwoDesc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 my-2 items-center">
              <div className="about-cubeActive flex flex-col items-center justify-center">
                <FaAngleUp />
                <FaAngleUp />
                <FaAngleUp />
              </div>
              <div className="w-80">
                <h2 className="font-bold text-lg">10x dev:</h2>
                <p>{skill.levelThreeDesc}</p>
              </div>
            </div>
          </div>
        )}
      </article>
    );
  });

  return (
    <>
      <h2 className="flex flex-row justify-around items-center max-w-[800px] px-2 m-auto text-center">
        <FaAngleDown />
        Citizen, please verify your skill level to comply with the minimum
        requirements.
        <FaAngleDown />
      </h2>
      {displayedSkills}
      <div className="skills-QuoteContainer border-2 w-[360px] max-w-[90vw] p-2 mx-auto my-10 text-right">
        <p className="text-lg underline">RoboQuote of the day:</p>
        <p className="text-lg text-center my-2 italic">
          I{"'"}ll fix you. I fix everything.
        </p>
        <p className="text-sm w-[200px] ">
          (Full-Stack dev when looking at the legacy codebase)
        </p>
      </div>
    </>
  );
}

Skills.propTypes = {
  skillName: PropTypes.string,
  setSkillName: PropTypes.func,
};
