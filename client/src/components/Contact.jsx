import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Contact({ listing }) {
  const [poster, setPoster] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        setPoster(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPoster();
  }, [listing.userRef]);

  return (
    <>
      {poster && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{poster.username}</span> for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>{" "}
            details.
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here."
            className="contact-textarea"
          ></textarea>
          <Link
            to={`mailto:${poster.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="contact-sendBtn"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}

Contact.propTypes = {
  listing: PropTypes.object,
};
