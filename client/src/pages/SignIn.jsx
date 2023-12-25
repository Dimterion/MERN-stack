import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import Header from "../components/Header";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <Header />
      <section className="signIn-section">
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">
            Please write down your login
          </h1>
          <h2 className="text-center my-4">You have two fields to comply</h2>
          <form onSubmit={handleSubmit} className="signIn-form">
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
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Not registered?</p>
            <Link to="/sign-up">
              <span className="signIn-signUpLink">
                You now have more fieds to comply.
              </span>
            </Link>
          </div>
          {error && <p className="mt-5">{error}</p>}
        </div>
      </section>
    </>
  );
}
