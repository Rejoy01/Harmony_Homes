import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  getProperty,
  removeBooking,
  removeResidency,
  updatePropertySoldStatus,
} from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import "../property/Property.css";
import { AiFillHeart } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModel from "../../components/BookingModel/BookingModel";
import UserDetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
import Heart from "../../components/Heart/Heart";
import { useNavigate } from "react-router-dom";
import "./Myproperty.css";

const MyProperty = () => {
  const navigate = useNavigate();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);
  // console.log(bookings);

  //   //Cancel Booking
  //   const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
  //     mutationFn: () => removeBooking(id, user?.email, token),
  //     onSuccess: () => {
  //       setUserDetails((prev) => ({
  //         ...prev,
  //         bookings: [...prev.bookings].filter((bk) => bk.id !== id),
  //       }));

  //       toast.success("Booking Cancelled", { position: "bottom-right" });
  //     },
  //   });

  const { user } = useAuth0();

  const { pathname } = useLocation();

  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["res", id], () =>
    getProperty(id)
  );

  const { mutate: deleteResidency, isLoading: deleting } = useMutation({
    mutationFn: () => removeResidency(id, token), // Define your removeResidency API function
    onSuccess: () => {
      toast.success("Residency Deleted", { position: "bottom-right" });
      navigate("/myproperties", { replace: true });
    },
  });

  const { mutate: updatePropertySold, isLoading: updatingSold } = useMutation({
    mutationFn: (isSold) => updatePropertySoldStatus(id, isSold, token),
    onSuccess: () => {
      // Handle success, e.g., show a success message or update local state
      toast.success("Property Sold Status Updated", {
        position: "bottom-right",
      });
      navigate("/myproperties", { replace: true });
    },
    onError: (error) => {
      // Handle errors, e.g., show an error message
      toast.error("Failed to update property sold status");
    },
  });

  const [modelOpened, setModelOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span className="primaryText">
            Error while fetching Details...........
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like BUtton */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image */}

        <img src={data?.image} alt="home image" />
        {data?.sold && <div className="sold-message primaryText">Sold Out</div>}

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>
            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms               */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parking</span>
              </div>
              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} room</span>
              </div>
            </div>

            {/* desc.. */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            {/* Delete button */}
            <Button
              className="button"
              variant="outline"
              w={"100%"}
              color="red"
              onClick={() => deleteResidency()}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Residency"}
            </Button>

            {/* sold */}
            <Button
              className="button"
              variant="outline"
              w={"100%"}
              color="red"
              onClick={() => {
                // Toggle the sold status
                updatePropertySold();
              }}
              disabled={updatingSold}
            >
              {updatingSold
                ? "Updating..."
                : data.sold
                ? "Sold Out"
                : "Set as Sold"}
            </Button>
         
          </div>

          {/* right */}
          <div className="right">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProperty;
