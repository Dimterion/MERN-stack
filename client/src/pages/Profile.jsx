import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import Header from "../components/Header";

export default function Profile() {
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));

        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));

        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));

        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);

        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);

        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <section className="profile-section">
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form
            onSubmit={handleSubmit}
            className="profile-form flex flex-col gap-4"
          >
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="Profile image."
              className="profile-img"
            />
            <pre className="text-center text-xs">
              Click on the image to update it
            </pre>
            <p className="text-sm self-center">
              {fileUploadError ? (
                <span className="opacity-50">
                  Image upload error (must be less than 2mb).
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="opacity-50">{`Uploading ${filePerc}%.`}</span>
              ) : filePerc === 100 ? (
                <span className="opacity-50">Image uploaded</span>
              ) : (
                ""
              )}
            </p>
            <input
              type="text"
              placeholder="Username"
              defaultValue={currentUser.username}
              id="username"
              className="border p-3"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              id="email"
              className="border p-3"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="border p-3"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="p-3 uppercase hover:opacity-80 disabled:opacity-80"
            >
              {loading ? "Updating..." : "Update data"}
            </button>
            <Link className="profile-link" to="/create-listing">
              Create listing
            </Link>
          </form>
          <div className="flex justify-between mt-5">
            <span
              onClick={handleDeleteUser}
              className="cursor-pointer hover:underline"
            >
              Delete account
            </span>
            <span
              onClick={handleSignOut}
              className="cursor-pointer hover:underline"
            >
              Sign out
            </span>
          </div>
          <p className="mt-5">{error ? error : ""}</p>
          <p className="mt-5 opacity-50">
            {updateSuccess ? "Data updated" : ""}
          </p>
          <button
            onClick={handleShowListings}
            className="mt-6 w-full hover:opacity-80"
          >
            Show Listings
          </button>
          <p className="mt-5">
            {showListingsError ? "Error showing listings." : ""}
          </p>
          {userListings && userListings.length > 0 && (
            <div className="flex flex-col gap-4">
              <h1 className="text-center mt-7 text-2xl font-semibold">
                Your Listings
              </h1>
              {userListings.map((listing) => (
                <div key={listing._id} className="profile-listingContainer">
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="Listing cover."
                      className="h-16 w-16 object-cover"
                    />
                  </Link>
                  <Link
                    className="font-semibold hover:underline truncate flex-1"
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="uppercase hover:opacity-80"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="uppercase  hover:opacity-80">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
