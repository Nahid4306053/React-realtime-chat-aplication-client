import React from "react";

export default function InputBox({type,placeholder,...rest}) {
  return (
    <div className="form-control">

      <input
       {...rest}
        type={type}
        placeholder={placeholder}
        className="input focus:outline-none bg-transparent w-full  input-bordered"
        required
      />
    </div>
  );
}
