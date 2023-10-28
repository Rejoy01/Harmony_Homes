import React, { useState } from "react";
import "../Properties/Properties.css"
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import PropertyCard from "../../components/propertyCard/PropertyCard";

import { PuffLoader } from "react-spinners";
import { property } from "lodash";
import { useAuth0 } from "@auth0/auth0-react";
import MypropertyCard from "../../components/MyPropertycard/MypropertyCard";

const Myproperties = () => {
  const [filter, setFilter] = useState("");

  const {user} = useAuth0()
  
//   console.log(user);
  const { data, isError, isLoading } = useProperties();
//   console.log("data----",data);
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
    const filteredData = user && data ? data.filter(item => item.userEmail === user.email) : [];
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
              <MypropertyCard card={card} key={i} />
            ))
          }
        </div>
      </div>
    </div>
  );
};
export default Myproperties;
