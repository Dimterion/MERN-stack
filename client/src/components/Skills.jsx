import { FaAngleUp } from "react-icons/fa";
import PropTypes from "prop-types";
import { skills } from "../assets/aboutPageContent";

export default function Skills({ skillName, setSkillName }) {
  const displayedSkills = skills.map((skill) => {
    return (
      <article
        className={
          skillName === skill.name && skill.name !== ""
            ? "skills-active flex flex-row flex-wrap items-center justify-between border-2 my-2"
            : "flex flex-row flex-wrap items-center justify-between my-2"
        }
        key={skill.id}
      >
        {skill.name !== "" && (
          <div
            onClick={() => setSkillName(skill.name)}
            className="about-skill flex gap-1 flex-wrap justify-between"
          >
            <div className="about-skillName uppercase">{skill.name}</div>
            <div className="flex gap-2">
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
          <div className="w-2/4">
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

  return <>{displayedSkills}</>;
}

Skills.propTypes = {
  skillName: PropTypes.string,
  setSkillName: PropTypes.func,
};
