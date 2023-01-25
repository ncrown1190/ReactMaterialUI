import React from "react";
import Groceries from "../components/Groceries";

interface Props {
  getGrocery?: any;
  grocery?: any;
}

const Grocery = (props: Props) => {
  props.getGrocery("Milk");
  console.log(props.grocery);
  return (
    <div>
      <Groceries {...props} />
    </div>
  );
};

export default Grocery;
