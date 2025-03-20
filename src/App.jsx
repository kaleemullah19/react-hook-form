import React from "react";
import "./App.css";
import FoodDeliveryForm from "./FoodDeliveryForm";
import TypicalForm from "./TypicalForm";
import Swr from "./Swr";
import SwrPost from "./SwrPost";
import RRSPWithdrawalForm from "./RRSPWithdrawalForm";

function App() {
  return (
    <>
      <div className="container">
        {/* <div className="mx-5"></div>
        <FoodDeliveryForm /> */}
        {/* <Swr></Swr> */}
        {/* <SwrPost></SwrPost> */}
        {/* {<TypicalForm></TypicalForm>} */}
        <RRSPWithdrawalForm />
      </div>
    </>
  );
}

export default App;
