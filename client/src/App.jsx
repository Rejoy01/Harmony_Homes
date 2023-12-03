import { Suspense, useState } from "react";
import "./index.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import "./App.css";
import Companies from "./components/Companies/Companies";
import Residencies from "./components/Residencies/Residencies";
import Value from "./components/Value/Value";
import Contact from "./components/Contact/Contact";
import GetStarted from "./components/GetStarted/GetStarted";
import Footer from "./components/Footer/Footer";
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "react-query/devtools";
import Property from "./pages/property/Property";
import UserDetailContext from "./context/UserDetailContext";
import { MantineProvider } from "@mantine/core";
import Bookings from "./pages/Booking/Bookings"
import Favourites from "./pages/Favourites/Favourites";
import Myproperties from "./pages/MyProperties/Myproperties";
import MyProperty from "./pages/MyProperty/MyProperty";

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        
          <Suspense fallback={<div>Loading.....</div>}>
            
            <Routes>
              
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/myproperties">
                  <Route index element={<Myproperties />} />
                  <Route path=":propertyId" element={<MyProperty />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
