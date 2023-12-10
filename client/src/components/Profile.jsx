import profileImg from "../assets/images/profileImg.jpg";

export default function Profile() {
  return (
    <article className="profile-article text-center border-2">
      <h2 className="profile-articleHeadingOne text-4xl my-4">
        I am very developy.
      </h2>
      <h2 className="profile-articleHeadingTwo text-2xl my-4">
        Will be a <span className="profile-articleSpan">cute</span> good
        addition to your team.
      </h2>
      <img
        className="profile-articleImg"
        src={profileImg}
        alt="Cute cat in futuristic suit."
      />
      <h2 className="profile-articleHeadingThree text-xl my-4">
        Pretty please.
      </h2>
      <p className="profile-articleParagraph m-4">
        P.S. Will work for at least 5 years of minimum, required, necessary,
        mandatory, obligatory experience to get a position of an entry-level
        associate junior assistant to a developer.
      </p>
    </article>
  );
}
