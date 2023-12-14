import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ListingItem({ listing }) {
  return (
    <article className="listingItem-article overflow-hidden w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://raw.githubusercontent.com/Dimterion/Portfolio-site/master/src/assets/image_panoramic.jpg"
          }
          alt="Listing cover."
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold ">{listing.name}</p>
          <p className="text-sm line-clamp-2">{listing.description}</p>
          <p className="mt-2 font-semibold">
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            ${listing.type === "subscription" && " / month"}
          </p>
          <div className="flex gap-4">
            <div className="font-bold text-xs">
              {listing.hours > 1
                ? `${listing.hours} hours`
                : `${listing.hours} hour`}
            </div>
            <div className="font-bold text-xs">
              {listing.parts > 1
                ? `${listing.parts} parts`
                : `${listing.parts} part`}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object,
};
