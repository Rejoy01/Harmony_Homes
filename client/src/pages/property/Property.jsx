import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import "./property.css";
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

const Property = () => {
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);
  // console.log(bookings);


  //Cancel Booking
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: [...prev.bookings].filter((bk) => bk.id !== id),
      }));

      toast.success("Booking Cancelled", { position: "bottom-right" });
    },
  });

  const { user } = useAuth0();

  const { pathname } = useLocation();

  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["res", id], () =>
    getProperty(id)
  );
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
  console.log(data);
  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like BUtton */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

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
                <span>{data?.facilities?.bathrooms}Bathrooms</span>
              </div>
              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings}Parking</span>
              </div>
              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms}room</span>
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
                {data?.address}
                {data?.city}
                {data?.country}
              </span>
            </div>

            {/* booking button  */}
            {bookings?.map((bookings) => bookings.id).includes(id) ? (
              <>
                  <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  Cancel Booking
                </Button>
                <span>
                  Your Visit already booked for date{" "}
                  {bookings?.filter((booking) => booking.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModelOpened(true);
                }}
              >
                Book Your Visit
              </button>
            )}

            <BookingModel
              opened={modelOpened}
              setOpened={setModelOpened}
              propertyId={id}
              email={user?.email}
            />
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

export default Property;
