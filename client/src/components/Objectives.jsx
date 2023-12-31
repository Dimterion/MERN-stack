import { useState } from "react";

export default function Objectives() {
  const [classified, setClassified] = useState(true);

  return (
    <>
      <article className="objectives-article">
        <div className="p-2 md:p-8 border">
          <h1 className="text-2xl">ROBOCODE evaluation</h1>
          <h2 className="uppercase my-1 border-b pb-4">
            Dev Ops Products System
          </h2>
          <fieldset className="objectives-fieldset">
            <legend className="uppercase px-2">Total Rating</legend>
            <div>
              <h2 className="text-4xl mb-4">A+</h2>
              <ul className="objectives-ul">
                <li>Serve the clean code</li>
                <li>Protect the main branch</li>
                <li>Uphold the documentation</li>
                {classified ? (
                  <button
                    className="text-lg py-2 uppercase hover:opacity-80"
                    onClick={() => setClassified(false)}
                  >
                    [ Classified ]
                  </button>
                ) : (
                  <li>
                    Any attempt to apply for a senior dev position results in
                    denial
                  </li>
                )}
              </ul>
            </div>
            <div className="objectives-img">
              <div
                className={
                  classified
                    ? "objectives-imgHelmet"
                    : "objectives-imgHelmetActive"
                }
              ></div>
              <div
                className={
                  classified
                    ? "objectives-imgVisor"
                    : "objectives-imgVisorActive"
                }
              ></div>
              <div className="objectives-imgMouth"></div>
              <div className="objectives-imgChin"></div>
            </div>
          </fieldset>
          <fieldset className="objectives-subFieldset">
            <legend className="uppercase px-2">Total XP Earned</legend>
            <div className="flex flex-row justify-between gap-4">
              <div className="objectives-xpBar"></div>
              <p>9,001 XP</p>
            </div>
          </fieldset>
        </div>
      </article>
      <div className="quote-container">
        <p className="text-lg underline">
          A special message for all the devs working from home:
        </p>
        <p className="text-lg text-center my-2 italic">
          Stay out of impostor syndrome bubble.
        </p>
      </div>
    </>
  );
}
