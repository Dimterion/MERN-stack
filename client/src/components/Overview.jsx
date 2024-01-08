import overviewImg from "../assets/images/overviewImg.jpg";

export default function Overview() {
  return (
    <article className="overview-article">
      <div className="border-2">
        <h2 className="overview-articleHeadingOne">I am very developy.</h2>
        <h2 className="overview-articleHeadingTwo">
          Will be a <span className="overview-articleSpan">cute</span> good
          addition to your team.
        </h2>
        <img
          className="overview-articleImg"
          src={overviewImg}
          alt="Cute cat in futuristic suit."
        />
        <h2 className="overview-articleHeadingThree">Pretty please.</h2>
        <p className="overview-articleParagraph">
          P.S. Will work for at least 5 years of minimum, required, necessary,
          mandatory, obligatory experience to get a position of an entry-level
          associate junior assistant (to the) seasoned developer.
        </p>
        <div className="overview-articleDiv">
          <p>Yours truly,</p>
          <p>Robocat</p>
        </div>
      </div>
    </article>
  );
}
