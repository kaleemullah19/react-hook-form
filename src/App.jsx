import "./App.css";
import FoodDeliveryForm from "./FoodDeliveryForm";
import TypicalForm from "./typicalForm";
import Swr from "./Swr";
import SwrPost from "./SwrPost";

function App() {
  return (
    <>
      <div className="container">
        {/* <div className="mx-5"></div>
        <FoodDeliveryForm /> */}
        <Swr></Swr>
        {/* <SwrPost></SwrPost> */}
        {<TypicalForm></TypicalForm>}
      </div>
    </>
  );
}

export default App;
