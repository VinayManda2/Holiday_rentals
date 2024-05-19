import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Test() {
  const [item, setItem] = useState({});

  const id = "6648646a57594b3c2d5cd3d9";
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/listings/${id}`
        );

        const data = await response.data.listing;

        setItem(data);
        console.log(data); // Log item after setting it
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    // Call the fetchListing function when component mounts
    fetchListing();

    // This effect runs only once when component mounts
  }, []); // Empty dependency array means this effect runs only once

  return (
    <>
      
    </>
  );
}

export default Test;
