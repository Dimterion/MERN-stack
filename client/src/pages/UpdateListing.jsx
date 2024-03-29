import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import Header from "../components/Header";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const params = useParams();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    link: "",
    type: "oneTimePurchase",
    hours: 1,
    parts: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    certificate: false,
    community: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setFormData(data);
    };

    fetchListing();
  }, [params.listingId]);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image upload failed (2mb max per image).");
          setUploading(false);
        });
    } else {
      setImageUploadError("Min 1, max 6 images per listing.");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} complete.`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "oneTimePurchase" || e.target.id === "subscription") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "certificate" ||
      e.target.id === "community" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image.");
      }

      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discounted price must be lower than regular price.");

      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="updateListing-main">
        <section className="p-3 max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7">
            Update listing
          </h1>
          <form onSubmit={handleSubmit} className="updateListing-form">
            <div className="flex flex-col gap-4 flex-1">
              <input
                type="text"
                placeholder="Name"
                className="border p-3"
                id="name"
                maxLength="60"
                minLength="5"
                required
                onChange={handleChange}
                value={formData.name}
              />
              <textarea
                type="text"
                placeholder="Description"
                className="border p-3 h-28"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
              <input
                type="text"
                placeholder="Link"
                className="border p-3"
                id="link"
                required
                onChange={handleChange}
                value={formData.link}
              />
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="oneTimePurchase"
                    className="updateListing-checkbox"
                    onChange={handleChange}
                    checked={formData.type === "oneTimePurchase"}
                  />
                  <span>One-time purchase</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="subscription"
                    className="updateListing-checkbox"
                    onChange={handleChange}
                    checked={formData.type === "subscription"}
                  />
                  <span>Subscription</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="certificate"
                    className="updateListing-checkbox"
                    onChange={handleChange}
                    checked={formData.certificate}
                  />
                  <span>Certificate</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="community"
                    className="updateListing-checkbox"
                    onChange={handleChange}
                    checked={formData.community}
                  />
                  <span>Community</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="offer"
                    className="updateListing-checkbox"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <span>Offer</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="hours"
                    min="1"
                    max="10000"
                    required
                    className="p-3"
                    onChange={handleChange}
                    value={formData.hours}
                  />
                  <p>Hours</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="parts"
                    min="1"
                    max="10000"
                    required
                    className="p-3"
                    onChange={handleChange}
                    value={formData.parts}
                  />
                  <p>Parts</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="regularPrice"
                    min="0"
                    max="10000"
                    required
                    className="p-3"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Regular price ($)</p>
                    {formData.type === "subscription" && (
                      <span className="text-xs">
                        {"("}per month{")"}
                      </span>
                    )}
                  </div>
                </div>
                {formData.offer && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="10000"
                      required
                      className="p-3"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div className="flex flex-col items-center">
                      <p>Discounted price ($)</p>
                      {formData.type === "subscription" && (
                        <span className="text-xs">
                          {"("}per month{")"}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal ml-2">
                  (the first image will be the cover; max 6).
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className="p-3 uppercase hover:opacity-80 disabled:opacity-80"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <p className="text-sm">{imageUploadError && imageUploadError}</p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="updateListing-imgContainer flex justify-between p-3 border-2 items-center"
                  >
                    <img
                      src={url}
                      alt="Listing image."
                      className="w-20 h-20 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 uppercase hover:opacity-80"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              <button
                disabled={loading || uploading}
                className="p-3 uppercase hover:opacity-80 disabled:opacity-80"
              >
                {loading ? "Updating listing..." : "Update listing"}
              </button>
              {error && <p className="text-sm">{error}</p>}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
