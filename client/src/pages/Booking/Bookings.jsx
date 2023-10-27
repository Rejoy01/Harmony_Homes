import React, { useState, useContext } from "react";
import "../Properties/Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import PropertyCard from "../../components/propertyCard/PropertyCard";
import UserDetailContext from "../../context/UserDetailContext";
import { PuffLoader } from "react-spinners";
import { property } from "lodash";

const Bookings = () => {
  const [filter, setFilter] = useState("");

  const {
    userDetails: { bookings },
  } = useContext(UserDetailContext);

  const { data, isError, isLoading } = useProperties();
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching the data</span>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  // console.log("data",data);
  // console.log("bookings ", bookings);

  const filteredData = data && bookings
  ? data.filter((property) => bookings.map((booking) => booking.id).includes(property.id))
  : [];

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter Properties">
          {
            // data.map((card,i)=>(<PropertyCard card={card} key={i} />))
            filteredData
              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};
export default Bookings;
