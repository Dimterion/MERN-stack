import profileImg from "../assets/images/profileImg.jpg";

export default function Profile() {
  return (
    <article className="profile-article text-center border-2 p-2">
      <div className="border-2">
        <h2 className="profile-articleHeadingOne text-4xl my-2">
          I am very developy.
        </h2>
        <h2 className="profile-articleHeadingTwo text-2xl my-2">
          Will be a <span className="profile-articleSpan">cute</span> good
          addition to your team.
        </h2>
        <img
          className="profile-articleImg"
          src={profileImg}
          alt="Cute cat in futuristic suit."
        />
        <h2 className="profile-articleHeadingThree text-xl my-2">
          Pretty please.
        </h2>
        <p className="profile-articleParagraph m-2 text-left px-10">
          P.S. Will work for at least 5 years of minimum, required, necessary,
          mandatory, obligatory experience to get a position of an entry-level
          associate junior assistant (to the) seasoned developer.
        </p>
        <div className="profile-articleDiv text-left mb-2 px-12">
          <p>Yours truly,</p>
          <p>Robocat</p>
        </div>
      </div>
    </article>
  );
}
