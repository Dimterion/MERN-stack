import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Header from "../components/Header";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [content, setContent] = useState("turnedOff");
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
    <section className="home-startBtnSection">
      <div className="home-startBtnWrap"></div>
      <button onClick={() => setContent("initial")} className="home-startBtn">
        <FaPowerOff />
      </button>{" "}
    </section>
  ) : content === "initial" ? (
    <section className="home-startBtnSection">
      <div className="home-startBtnWrap">
        <h1>
          ROBO<span>CODE</span>
        </h1>
        <p>You must comply to proceed, citizen.</p>
        <div className="home-complyBtnWrap">
          <span>{"> "}</span>
          <button onClick={() => setContent("")}>Comply</button>
        </div>
      </div>
      <button
        onClick={() => setContent("turnedOff")}
        className={`home-startBtn ${content === "initial" && "active-btn"}`}
      >
        <FaPowerOff />
      </button>
    </section>
  ) : (
    <div>
      <Header />
      {/* Top */}
      <aside className="home-aside my-4">
        <div className="home-verticalLine"></div>
        <div className="home-horizontalLine"></div>
        <div className="home-asideInner flex flex-col gap-4 p-20 px-3 md:w-1/4 w-3/5 max-w-6xl mx-auto my-40">
          <h1 className="font-bold text-3xl lg:text-6xl">
            Find your Prime <span style={{ color: "#2d6a4f" }}>coding</span>
            <br />
            Directives
          </h1>
          <div className="home-subHeading">
            Dev or AI,
            <br />
            you{"'"}re coding with me
          </div>
          <Link to={"/search"} className="font-bold hover:underline">
            {">> "}Commence search
          </Link>
        </div>
      </aside>
      {/* Swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] w-[500px] m-auto"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* Listings results */}
      <div className="max-w-6xl mx-auto p-3 flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <>
            <div className="my-3">
              <h2 className="text-2xl font-semibold">Recent offers</h2>
              <Link
                className="text-sm hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}
        {subscriptionListings && subscriptionListings.length > 0 && (
          <>
            <div className="my-3">
              <h2 className="text-2xl font-semibold">Recent subscriptions</h2>
              <Link
                className="text-sm hover:underline"
                to={"/search?type=subscription"}
              >
                Show more subscriptions
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
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
                Recent one-time purchases
              </h2>
              <Link
                className="text-sm hover:underline"
                to={"/search?type=oneTimePurchase"}
              >
                Show more one-time purchases
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {oneTimePurchaseListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
