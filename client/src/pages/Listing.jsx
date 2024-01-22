import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaGraduationCap,
  FaLink,
  FaListUl,
  FaRegClock,
  FaUserFriends,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Header from "../components/Header";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const params = useParams();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);

          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <>
      <Header />
      <main className="listing-main">
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl">Something went wrong.</p>
        )}
        {listing && !loading && !error && (
          <div className="relative">
            <Swiper navigation className="border-b-2 border-current pb-4">
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[350px] w-[1000px] m-auto max-w-[90vw] max-h-[50vh]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="listing-shareBtn">
              <FaLink
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && <p className="listing-shareBtnText">Link copied</p>}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listing.name} -{" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                ${listing.type === "subscription" && " / month"}
              </p>
              <p className="flex items-center mt-6 gap-2 font-bold uppercase hover:underline">
                <FaLink />
                <a href={listing.link} target="_blank" rel="noreferrer">
                  Course Link
                </a>
              </p>
              <div className="flex gap-4">
                <p className="listing-type">
                  {listing.type === "subscription"
                    ? "Subscription"
                    : "One-time purchase"}
                </p>
                {listing.offer && (
                  <p className="listing-type">
                    {+listing.regularPrice - +listing.discountPrice}$ discount
                  </p>
                )}
              </div>
              <p className="mt-2 border-t-2 border-current pt-6">
                <span className="font-semibold uppercase">Description: </span>
                {listing.description}
              </p>
              <ul className="font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-2 border-b-2 border-t-2 pb-2 pt-2 border-current">
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaRegClock className="text-xl mr-1" />
                  {listing.hours > 1
                    ? `${listing.hours} hours`
                    : `${listing.hours} hour`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaListUl className="text-xl mr-1" />
                  {listing.parts > 1
                    ? `${listing.parts} parts`
                    : `${listing.parts} part`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaGraduationCap className="text-xl mr-1" />
                  {listing.certificate
                    ? "Certificate of completion"
                    : "No certificate of completion"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaUserFriends className="text-xl mr-1" />
                  {listing.community ? "Community" : "No community"}
                </li>
              </ul>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="listing-contactBtn"
                  >
                    Contact poster
                  </button>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
