// eslint-disable-next-line no-unused-vars
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./pages/rating.css";

const Log = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/listings/${params.id}`
        );

        const data = response.data.listing;

        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  console.log("after ", item);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/listings/${item._id}`);
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (!item) return "";
  if (loading) {
    return <div>Loading...</div>;
  }

  // reviews
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your submit logic here
    console.log(`comment ${comment} and rating ${rating}`);
  };

  return (
    <div className="row mt-3 ">
      <div className="col-8 offset-3">
        <h5 className="card-title">{item.title}</h5>
      </div>

      <div className="card col-6 offset-3 show-card listing-card">
        <img
          src={item.image.url}
          className="card-img-top show-img"
          alt="listing_image"
        />
        <div className="card-body">
          <h5 className="card-title">owned by {item.owner.username}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text">
            &#8377; {item.price.toLocaleString("en-IN")}
          </p>
          <p className="card-text">{item.location}</p>
          <p className="card-text">{item.country}</p>
        </div>
      </div>

      {userId && userId === item.owner._id && (
        <div className="btns">
          <Link
            to={`/api/listings/${item._id}/edit`}
            className="btn btn-dark col-1 offset-3 edit-btn"
          >
            Edit
          </Link>

          <button onClick={handleDelete} className="btn btn-dark offset-5">
            Delete
          </button>
        </div>
      )}

      <div className="col-8 offset-2">
        {userId && (
          <>
            <hr />
            <h4>Leave a review</h4>
            <form
              className="mb-3 needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="mt-3 mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <fieldset className="starability-slot">
                  <input
                    type="radio"
                    id="no-rate"
                    className="input-no-rate"
                    name="review[rating]"
                    value="0"
                    checked
                    aria-label="No rating."
                  />
                  <input
                    type="radio"
                    id="first-rate1"
                    name="review[rating]"
                    value="1"
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate1" title="Terrible">
                    1 star
                  </label>
                  <input
                    type="radio"
                    id="first-rate2"
                    name="review[rating]"
                    value="2"
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate2" title="Not good">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate3"
                    name="review[rating]"
                    value="3"
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate3" title="Average">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate4"
                    name="review[rating]"
                    value="4"
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate4" title="Very good">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate5"
                    name="review[rating]"
                    value="5"
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate5" title="Amazing">
                    5 stars
                  </label>
                </fieldset>
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Comments
                </label>
                <textarea
                  name="review[comment]"
                  id="comment"
                  cols="30"
                  rows="5"
                  className="form-control"
                  required
                  onChange={handleCommentChange}
                ></textarea>
                <div className="invalid-feedback">
                  please add some comments for review
                </div>
              </div>
              <button className="btn btn-outline-dark">Submit</button>
            </form>
          </>
        )}

        <hr />
        <h4>All reviews</h4>
        <div className="row">
          {item.reviews.map((review) => (
            <div key={review._id} className="card col-5 ms-3 mb-3">
              <div className="card-body">
                <h5 className="card-title">@{review.author.username}</h5>

                <p className="card-text">{review.comment}</p>
                {userId && userId === review.author._id && (
                  <form
                    onSubmit={() => handleDeleteReview(review._id)}
                    className="mb-3"
                  >
                    <button type="submit" className="btn btn-sm btn-dark">
                      Delete
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Log;
