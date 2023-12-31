import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="signUp-section">
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">
            There{"'"}s a new coder in town
          </h1>
          <h2 className="text-center my-4">You have three fields to comply</h2>
          <form
            onSubmit={handleSubmit}
            className="signUp-form flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Username"
              className="border p-3"
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3"
              id="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="p-3 uppercase hover:opacity-80 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Already registered?</p>
            <Link to="/sign-in">
              <span className="signUp-signInLink">Proceed here.</span>
            </Link>
          </div>
          {error && <p className="mt-5">{error}</p>}
        </div>
      </section>
    </>
  );
}
