import { useState } from "react";

const propertyDetails = (props) => {
  const listing = props.location.state.listing;
  const currentUser = "66420d6952cf1bdd3b0a6981";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [comment, setComment] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rating, setRating] = useState(1);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, you can use APIs to send data to backend
    console.log("Submitting Review:", { rating, comment });
  };

  return (
    <div>
      <div className="row mt-3">
        <div className="col-8 offset-3">
          <h5 className="card-title">{listing.title}</h5>
        </div>
        <div className="card col-6 offset-3 show-card listing-card">
          <img
            src={listing.image.url}
            className="card-img-top show-img"
            alt="listing_image"
          />
          <div className="card-body">
            <h5 className="card-title">owned by {listing.owner.username} </h5>
            <p className="card-text">{listing.description} </p>
            <p className="card-text">
              &#8377; {listing.price.toLocaleString("en-IN")}{" "}
            </p>
            <p className="card-text">{listing.location}</p>
            <p className="card-text">{listing.country}</p>
          </div>
        </div>
      </div>
      {currentUser && currentUser._id === listing.owner._id && (
        <div className="btns">
          <a
            href={`/listings/${listing._id}/edit`}
            className="btn btn-dark col-1 offset-3 edit-btn"
          >
            Edit
          </a>
          <form
            method="POST"
            action={`/listings/${listing._id}?_method=DELETE`}
          >
            <button className="btn btn-dark offset-5">Delete</button>
          </form>
        </div>
      )}

      <div className="col-8 offset-3">
        {currentUser && (
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
                    name="rating"
                    value="0"
                    checked={rating === 0}
                    onChange={handleRatingChange}
                    aria-label="No rating."
                  />
                  <input
                    type="radio"
                    id="first-rate1"
                    name="rating"
                    value="1"
                    checked={rating === 1}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate1" title="Terrible">
                    1 star
                  </label>
                  <input
                    type="radio"
                    id="first-rate2"
                    name="rating"
                    value="2"
                    checked={rating === 2}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate2" title="Not good">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate3"
                    name="rating"
                    value="3"
                    checked={rating === 3}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate3" title="Average">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate4"
                    name="rating"
                    value="4"
                    checked={rating === 4}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate4" title="Very good">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate5"
                    name="rating"
                    value="5"
                    checked={rating === 5}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor="first-rate5" title="Amazing">
                    5 stars
                  </label>
                </fieldset>
              </div>
              <div className=" mb-3">
                <label htmlFor="comment" className="form-label">
                  Comments
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="5"
                  className="form-control"
                  value={comment}
                  onChange={handleCommentChange}
                  required
                ></textarea>
                <div className="invalid-feedback">
                  please add some comments for review
                </div>
              </div>
              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
          </>
        )}
        <hr />
        <h4>All reviews</h4>
        <div className="row">
          {listing.reviews.map((review) => (
            <div key={review._id} className="card col-5 ms-3 mb-3">
              <div className="card-body">
                <h5 className="card-title">@{review.author.username}</h5>
                <p
                  className="starability-result card-text"
                  data-rating={review.rating}
                ></p>
                <p className="card-text">{review.comment}</p>
                <form
                  action={`/listings/${listing._id}/reviews/${review._id}?_method=DELETE`}
                  method="post"
                  className="mb-3"
                >
                  <button className="btn btn-sm btn-dark">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default propertyDetails;
