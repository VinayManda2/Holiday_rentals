import React from 'react';

const ListingDetails = ({ currentUser, listing }) => {
  const handleDeleteReview = (reviewId) => {
    // Implement delete review functionality
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-3">
        <h5 className="card-title">{listing.title}</h5>
      </div>


      <div className="card col-6 offset-3 show-card listing-card">
        <img src={listing.image.url} className="card-img-top show-img" alt="listing_image" />
        <div className="card-body">
          <h5 className="card-title">owned by {listing.owner.username}</h5>
          <p className="card-text">{listing.description}</p>
          <p className="card-text">&#8377; {listing.price.toLocaleString("en-IN")}</p>
          <p className="card-text">{listing.location}</p>
          <p className="card-text">{listing.country}</p>
        </div>
      </div>



      {currentUser && currentUser._id === listing.owner._id && (
        <div className="btns">
          <a href={`/listings/${listing._id}/edit`} className="btn btn-dark col-1 offset-3 edit-btn">Edit</a>
          <form method="POST" action={`/listings/${listing._id}?_method=DELETE`}>
            <button className="btn btn-dark offset-5">Delete</button>
          </form>
        </div>
      )}


      <div className="col-8 offset-3">
        {currentUser && (
          <>
            <hr />
            <h4>Leave a review</h4>
            <form className="mb-3 needs-validation" noValidate action={`/listings/${listing.id}/reviews`} method="post">
              <div className="mt-3 mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                {/* Implement star rating component */}
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comments</label>
                <textarea name="review[comment]" id="comment" cols="30" rows="5" className="form-control" required></textarea>
                <div className="invalid-feedback">please add some comments for review</div>
              </div>
              <button className="btn btn-outline-dark">Submit</button>
            </form>
          </>
        )}


        <hr />
        <h4>All reviews</h4>
        <div className="row">
          {listing.reviews.map(review => (
            <div key={review._id} className="card col-5 ms-3 mb-3">
              <div className="card-body">
                <h5 className="card-title">@{review.author.username}</h5>
                {/* Implement star rating display */}
                <p className="card-text">{review.comment}</p>
                {currentUser && currentUser._id === review.author._id && (
                  <form onSubmit={() => handleDeleteReview(review._id)} className="mb-3">
                    <button type="submit" className="btn btn-sm btn-dark">Delete</button>
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

export default ListingDetails;
