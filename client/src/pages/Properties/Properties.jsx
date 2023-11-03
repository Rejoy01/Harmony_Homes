import React, { useState } from "react";
import "./Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import PropertyCard from "../../components/propertyCard/PropertyCard";

import { PuffLoader } from "react-spinners";
import { property } from "lodash";
import { useAuth0 } from "@auth0/auth0-react";
import MypropertyCard from "../../components/MyPropertycard/MypropertyCard";

const Properties = () => {
  const [filter, setFilter] = useState("");
  const {user} = useAuth0()
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

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter Properties">
          {
            // data.map((card,i)=>(<PropertyCard card={card} key={i} />))
            data
            .filter(property => !property.sold)
            .filter(
              (property) =>
                !property.sold &&
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => {
              if (user?.email === card.userEmail) {
                return <MypropertyCard card={card} key={i} />;
              } else {
                return <PropertyCard card={card} key={i} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};
export default Properties;
