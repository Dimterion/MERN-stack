import { FaAngleUp } from "react-icons/fa";
import PropTypes from "prop-types";

function Skills({ skill, setSkill }) {
  return (
    <article className="flex flex-row flex-wrap justify-around">
      <div>
        <div
          onClick={() => setSkill("html")}
          className="about-skill flex gap-1 flex-wrap justify-between"
        >
          <div className="about-skillName">HTML</div>
          <div className="flex gap-2">
            <div className="about-cubeActive"></div>
            <div className="about-cubeActive flex flex-col items-center justify-center">
              <FaAngleUp />
            </div>
            <div className="about-cubeActive"></div>
            <div className="about-cubeActive flex flex-col items-center justify-center">
              <FaAngleUp />
              <FaAngleUp />
            </div>
            <div className="about-cubeActive"></div>
            <div className="about-cubeActive flex flex-col items-center justify-center">
              <FaAngleUp />
              <FaAngleUp />
              <FaAngleUp />
            </div>
          </div>
        </div>
        <div
          onClick={() => setSkill("css")}
          className="about-skill flex gap-1 flex-wrap justify-between"
        >
          <div className="about-skillName">CSS</div>
          <div className="flex gap-2">
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
          </div>
        </div>
        <div
          onClick={() => setSkill("javaScript")}
          className="about-skill flex gap-1 flex-wrap justify-between"
        >
          <div className="about-skillName">JavaScript</div>
          <div className="flex gap-2">
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
            <div className="about-cube"></div>
          </div>
        </div>
      </div>
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
