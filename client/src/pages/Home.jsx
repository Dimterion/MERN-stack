import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaPowerOff } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Header from "../components/Header";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [content, setContent] = useState(
    localStorage.content && localStorage.content !== ""
      ? localStorage.content
      : localStorage.content === ""
      ? ""
      : "turnedOff"
  );
  const [showListings, setShowListings] = useState(false);
  const [offerListings, setOfferListings] = useState([]);
  const [oneTimePurchaseListings, setOneTimePurchaseListings] = useState([]);
  const [subscriptionListings, setSubscriptionListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();

        setOfferListings(data);
        fetchSubscriptionListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSubscriptionListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=subscription&limit=4");
        const data = await res.json();

        setSubscriptionListings(data);
        fetchOneTimePurchaseListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOneTimePurchaseListings = async () => {
      try {
        const res = await fetch(
          "/api/listing/get?type=oneTimePurchase&limit=4"
        );
        const data = await res.json();

        setOneTimePurchaseListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return content === "turnedOff" ? (
    <section className="home-startBtnSection fixed top-0 right-0 bottom-0 left-0">
      <div className="home-startBtnWrap"></div>
      <button
        onClick={() => {
          setContent("initial");
          localStorage.setItem("content", "initial");
        }}
        className="home-startBtn transition-transform active:scale-90"
      >
        <FaPowerOff />
      </button>{" "}
    </section>
  ) : content === "initial" ? (
    <section className="home-startBtnSection fixed top-0 right-0 bottom-0 left-0">
      <div className="home-startBtnWrap">
        <h1>
          ROBO<span>CODE</span>
        </h1>
        <p>You must comply to proceed, citizen.</p>
        <div className="home-complyBtnWrap relative">
          <FaChevronRight className="home-chevron absolute -left-8" />
          <button
            onClick={() => {
              localStorage.setItem("content", "");
              setContent("");
            }}
          >
            Comply
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.setItem("content", "turnedOff");
          setContent("turnedOff");
        }}
        className={`home-startBtn transition-transform active:scale-90 ${
          content === "initial" && "active-btn"
        }`}
      >
        <FaPowerOff />
      </button>
    </section>
  ) : (
    <>
      <Header header={"header-header"} />
      {!showListings && (
        <aside className="home-aside relative">
          <div className="home-verticalLine"></div>
          <div className="home-horizontalLine"></div>
          <div className="home-asideInner flex flex-col items-start gap-4 py-20 px-3 w-[260px] max-w-[95vw] mx-auto my-40">
            <h1 className="font-bold text-3xl">
              Find your Prime <span style={{ color: "#2d6a4f" }}>coding</span>
              <br />
              Directives
            </h1>
            <div className="home-subHeading">
              Dev or AI,
              <br />
              you{"'"}re coding with me
            </div>
            <button
              onClick={() => setShowListings(true)}
              className="font-bold hover:underline"
            >
              {">> "}Commence search
            </button>
          </div>
        </aside>
      )}
      {showListings && (
        <div className="home-listingsContainer pt-4">
          <Swiper navigation className="swiper border-b-2 pb-4">
            {offerListings &&
              offerListings.length > 0 &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <Link to={`/listing/${listing._id}`}>
                    <div
                      style={{
                        background: `url(${listing.imageUrls[0]}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                      className="h-[350px] w-[1000px] m-auto max-w-[90vw] max-h-[50vh]"
                    ></div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="home-listingsTextContainer border-b-2 pb-4">
            <p className="w-[1000px] max-w-[95vw] mx-auto py-4 text-center">
              Citizen, please familiarize yourself with our suggestions of the
              resources that might help you become a potential robocoder. On
              behalf of the AI department we wish you luck in getting better
              than us. Thank you for your cooperation*.
            </p>
            <h2 className="text-center italic">Prog City administration</h2>
            <h3 className="text-center italic">(former Codetroit)</h3>
          </div>
          <div className="max-w-6xl mx-auto p-3 flex-col gap-8 my-6">
            {offerListings && offerListings.length > 0 && (
              <>
                <div className="my-3">
                  <h2 className="text-2xl font-semibold">Recent offers</h2>
                  <Link
                    className="text-sm hover:underline"
                    to={"/search?offer=true"}
                  >
                    {"> "}Show more
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 mb-10">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </>
            )}
            {subscriptionListings && subscriptionListings.length > 0 && (
              <>
                <div className="my-3">
                  <h2 className="text-2xl font-semibold">
                    Subscription-based courses
                  </h2>
                  <Link
                    className="text-sm hover:underline"
                    to={"/search?type=subscription"}
                  >
                    {"> "}Show more
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4  mb-10">
                  {subscriptionListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </>
            )}
            {oneTimePurchaseListings && oneTimePurchaseListings.length > 0 && (
              <>
                <div className="my-3">
                  <h2 className="text-2xl font-semibold">
                    One-time purchase courses
                  </h2>
                  <Link
                    className="text-sm hover:underline"
                    to={"/search?type=oneTimePurchase"}
                  >
                    {"> "}Show more
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4  mb-10">
                  {oneTimePurchaseListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </>
            )}
          </div>
          <footer className="w-[80vw] mx-auto pb-2 text-xs text-center">
            *Please note we bear no responsibility over your chances of success
            on the brave path of becoming a successful candidate. We also have
            no monetary interest in the provided resources and are not sponsored
            by them.
          </footer>
        </div>
      )}
    </>
  );
}
