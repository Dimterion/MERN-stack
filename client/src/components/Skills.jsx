import { FaAngleUp } from "react-icons/fa";
import PropTypes from "prop-types";
import { skills } from "../assets/aboutPageContent";

function Skills({ skill, setSkill }) {
  const displayedSkills = skills.map((skill) => {
    return (
      <div
        key={skill.id}
        onClick={() => setSkill(skill.name)}
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
    );
  });

  return (
    <article className="flex flex-row flex-wrap justify-around">
      <div>{displayedSkills}</div>
      <>
        {skill === "html" && (
          <div className="w-2/4">
            <div className="flex flex-wrap gap-2 my-2 items-center">
              <div className="about-cubeActive flex flex-col items-center justify-center">
                <FaAngleUp />
              </div>
              <div className="w-80">
                <h2 className="font-bold text-lg">Aspiring coder:</h2>
                <p>Can make a Hello world page.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 my-2 items-center">
              <div className="about-cubeActive flex flex-col items-center justify-center">
                <FaAngleUp />
                <FaAngleUp />
              </div>
              <div className="w-80">
                <h2 className="font-bold text-lg">Seasoned programmer:</h2>
                <p>Knows how to link CSS stylesheet.</p>
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
                <p>
                  Easily enters a debate on whether HTML is a programming
                  language and can support any of the arguing parties.
                </p>
              </div>
            </div>
          </div>
        )}
        {skill === "css" && <div className="w-2/4">CSS</div>}
        {skill === "javaScript" && <div className="w-2/4">JavaScript</div>}
        {skill === "react" && <div className="w-2/4">React</div>}
        {skill === "" && <div className="w-2/4"></div>}
      </>
    </article>
  );
}

export default Skills;

Skills.propTypes = {
  skill: PropTypes.string,
  setSkill: PropTypes.func,
};
