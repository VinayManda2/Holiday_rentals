import Properties from "./pages/properties";
import AddProperty from "./pages/addProperty";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Log from "./log";
import EditListingForm from "./pages/editListingForm";
import Test from "./temp";
import YourComponent from "./yourComponent";
// import displayProperty from "./pages/displayProperty";
// import propertyDetails from "./pages/propertyDetails";

function App() {
  return (
    <Routes>
      <Route path="/api/listings" element={<Properties />} />
      <Route path="/api/listings/new" element={<AddProperty />} />
      <Route path="/api/listings/new/test" element={<YourComponent />} />
      {/* <Route path="/api/listings/:id" element={<propertyDetails />} /> */}
      <Route
        path="/api/listings/:id"
        element={<Log />} // Pass props to PropertyDetails
      />
      <Route path="/api/listings/:id/edit" element={<EditListingForm />} />
      <Route path="/api/signup" element={<Signup />} />
      <Route path="/api/login" element={<Login />} />
      <Route path="/api/test" element={<Test />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
