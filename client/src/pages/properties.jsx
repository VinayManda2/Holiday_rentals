import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Properties = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredListings, setFilteredListings] = useState([]);
  const [showTaxes, setShowTaxes] = useState(false);

  const filters = [
    { label: "All", icon: "fa-hotel" },
    { label: "Trending", icon: "fa-fire" },
    { label: "Rooms", icon: "fa-bed" },
    { label: "Iconic Cities", icon: "fa-mountain-city" },
    { label: "Mountains", icon: "fa-person-hiking" },
    { label: "Castles", icon: "fa-fort-awesome" },
    { label: "Pools", icon: "fa-person-swimming" },
    { label: "Camping", icon: "fa-campground" },
    { label: "Igloos", icon: "fa-igloo" },
    { label: "Farms", icon: "fa-house-chimney-window" },
    { label: "Garages", icon: "fa-warehouse" },
    { label: "Buildings", icon: "fa-building" },
    { label: "Tents", icon: "fa-tent" },
    { label: "DineOuts", icon: "fa-bell-concierge" },
  ];

  const baseURL = "http://localhost:8080/api"; // Update this with your server's address

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${baseURL}/listings`);
        setFilteredListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      setFilteredListings([]);
    } else {
      setFilteredListings(
        filteredListings.filter((listing) => listing.type === filter)
      );
    }
  };

  const handleTaxChange = (event) => {
    setShowTaxes(event.target.checked);
  };

  return (
    <div>
      <div id="filters">
        {filters.map((filter) => (
          <div
            className={`filter ${
              selectedFilter === filter.label ? "active" : ""
            }`}
            onClick={() => handleFilterChange(filter.label)}
            key={filter.label}
          >
            <div>
              <i className={`fa-solid ${filter.icon}`}></i>
            </div>
            <p>{filter.label}</p>
          </div>
        ))}
        <div className="filter form-check form-switch ">
          <input
            className="form-check-input mt-2"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={handleTaxChange}
          />
          <label
            className="form-check-label mt-1"
            htmlFor="flexSwitchCheckDefault"
          >
            <b>Taxes</b>
          </label>
        </div>
      </div>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-2">
        {filteredListings.map((listing) => (
          <Link
            to={`/api/listings/${listing._id}`}
            className="listing-link"
            key={listing._id}
            listing={listing} // Pass the listing object as props
          >
            <div className="card col listing-card" style={{ width: "25rem" }}>
              <img
                src={listing.image.url}
                className="card-img-top"
                alt="listing_image"
                style={{ height: "20rem" }}
              />
              <div className="card-body mt-1">
                <h6 className="card-title">{listing.title}</h6>
                <p className="card-text">
                  {showTaxes ? (
                    <>Price: ₹{listing.priceTaxed}</>
                  ) : (
                    <>
                      Price: ₹{listing.price}{" "}
                      <i id="tax-info">&nbsp; &nbsp; + 18% GST</i>
                    </>
                  )}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Properties;
