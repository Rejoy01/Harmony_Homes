import React, { useContext, useState } from "react";
import { Modal, Button, MantineProvider } from "@mantine/core";

import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModel = ({ opened, setOpened, email, propertyId }) => {

    const [value, setValue] = useState(null);

  const {
    userDetails: { token ,bookings},
    setUserDetails,
  } = useContext(UserDetailContext);
  // console.log(token)
 
  
 
  const handleBookingSuccess = () => {
    
      toast.success("You have booked your visit", {
        position: "bottom-right",
      });
      setUserDetails((data)=>({
        ...data,
        bookings:[
            ...(data.bookings || []),{
                id:propertyId,
                date : dayjs(value).format("DD/MM/YYYY")
            }
        ]
      }))
    }


  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <MantineProvider>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select you date of visit"
        centered
      >
        <div className="flexColCenter">
          <DatePicker onChange={setValue} value={value} minDate={new Date()} />
          <Button disabled={!value || isLoading} onClick={() => mutate()}>
            Book Visit
          </Button>
        </div>
      </Modal>
    </MantineProvider>
  );
};

export default BookingModel;
