import { useState } from "react";
import axios from "axios";

const EditListingForm = () => {
  const listing = {
    _id: {
      $oid: "664742b56694ffbd6b4a54cb",
    },
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    reviews: [],
    owner: {
      $oid: "66420d6952cf1bdd3b0a6981",
    },
    __v: 0,
  };

  const originalUrl =
    "https://t4.ftcdn.net/jpg/02/81/89/73/360_F_281897358_3rj9ZBSZHo5s0L1ug7uuIHadSxh9Cc75.jpg";

  const [formData, setFormData] = useState({
    id: "664742b56694ffbd6b4a54cb",
    title: listing.title,
    description: listing.description,
    price: listing.price,
    country: listing.country,
    location: listing.location,
  });

  const [file, setFile] = useState(listing.image);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, title, description, price, country, location } = formData;
    console.log("object");
    console.log({ title, description, price, country, location });

    // Create FormData object to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    formDataToSend.append("title", title);
    formDataToSend.append("description", description);
    formDataToSend.append("price", price);
    formDataToSend.append("country", country);
    formDataToSend.append("location", location);
    formDataToSend.append("file", file);
    console.log("form data to send ", formDataToSend);
    await axios
      .put(`http://localhost:8080/api/listings/${listing._id}`, formDataToSend)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-2">
        <h3>Edit your Listing</h3>
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
            <div className="valid-feedback">Title Looks good!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            ></textarea>
            <div className="invalid-feedback">
              Please enter a short description.
            </div>
          </div>
          <div>
            <label className="form-label">Original Listing Image</label> <br />
            <img src={originalUrl} alt="unable to load" />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              name="image"
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                className="form-control"
              />
              <div className="invalid-feedback">
                Please enter a valid price.
              </div>
            </div>
            <div className="mb-3 col-md-8">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
              <div className="invalid-feedback">
                Please enter the country name.
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
            <div className="invalid-feedback">Please enter a location.</div>
          </div>
          <button type="submit" className="btn btn-dark edit-btn mt-3">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListingForm;
