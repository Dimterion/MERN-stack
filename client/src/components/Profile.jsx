import profileImg from "../assets/images/profileImg.jpg";

export default function Profile() {
  return (
    <article className="profile-article">
      <div className="border-2">
        <h2 className="profile-articleHeadingOne">I am very developy.</h2>
        <h2 className="profile-articleHeadingTwo">
          Will be a <span className="profile-articleSpan">cute</span> good
          addition to your team.
        </h2>
        <img
          className="profile-articleImg"
          src={profileImg}
          alt="Cute cat in futuristic suit."
        />
        <h2 className="profile-articleHeadingThree">Pretty please.</h2>
        <p className="profile-articleParagraph">
          P.S. Will work for at least 5 years of minimum, required, necessary,
          mandatory, obligatory experience to get a position of an entry-level
          associate junior assistant (to the) seasoned developer.
        </p>
        <div className="profile-articleDiv">
          <p>Yours truly,</p>
          <p>Robocat</p>
        </div>
      </div>
    </article>
  );
}
