import { useForm } from "react-hook-form";

import "./BasicControl.scss";

export const BasicControl = (props) => {
  const { register, handleSubmit } = useForm();

  const update = (data) => {
    console.log(typeof data.cellCount);
    props.updateAddress(data.address);
    props.updateCellCount(data.cellCount);
  };

  return (
    <div className="basic-control">
      <form onSubmit={handleSubmit(update)}>
        <label htmlFor="address">Base Address</label>
        <input
          id="address"
          name="address"
          type="text"
          ref={register}
          defaultValue={props.address}
        />

        <label htmlFor="cellCount">Number of Cells</label>
        <input
          id="cellCount"
          name="cellCount"
          type="text"
          ref={register({ valueAsNumber: true })}
          defaultValue={props.cellCount}
        />

        <input type="submit" />
      </form>
    </div>
  );
};
