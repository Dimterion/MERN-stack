import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaGraduationCap,
  FaLink,
  FaListUl,
  FaRegClock,
  FaShare,
  FaUserFriends,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const params = useParams();

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
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong.</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[12%] right-[2%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[20%] right-[2%] z-10 rounded-md bg-slate-100 p-2">
              Link is copied.
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} -{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              ${listing.type === "subscription" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaLink className="text-green-700" />
              {listing.link}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "subscription"
                  ? "Subscription"
                  : "One-time purchase"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {+listing.regularPrice - +listing.discountPrice}$
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description: </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaRegClock className="text-lg" />
                {listing.hours > 1
                  ? `${listing.hours} hours`
                  : `${listing.hours} hour`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaListUl className="text-lg" />
                {listing.parts > 1
                  ? `${listing.parts} parts`
                  : `${listing.parts} part`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaGraduationCap className="text-lg" />
                {listing.certificate
                  ? "Certificate of completion"
                  : "No certificate of completion"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaUserFriends className="text-lg" />
                {listing.community ? "Community" : "No community"}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
