import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";

const AddPropertyModel = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);

  const { user } = useAuth0();

  const userEmail = (async () => {
    try {
      const { user } = useAuth0();; // Replace with your method of getting user data
  
      if (user && user.email) {
        return user.email;
      } else {
        console.log("User or email not available");
        return null; // or any other default value
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // or handle the error as needed
    }
  })();
  
  userEmail.then((email) => {
    if (email !== null) {
      console.log("User's email:", email);
    }
  });
  
  

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: userEmail,
  });
  console.log(propertyDetails);
  
  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Address">
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
            
          </Stepper.Step>
          <Stepper.Step label=" Basics" description="Details">
            <BasicDetails 
               prevStep={prevStep}
               nextStep={nextStep}
               propertyDetails={propertyDetails}
               setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step>
            <Facilities 
               prevStep={prevStep}
               nextStep={nextStep}
               propertyDetails={propertyDetails}
               setOpened={setOpened}
               setPropertyDetails={setPropertyDetails}

            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModel;
