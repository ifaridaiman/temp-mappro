import React from "react";

const formStep4 = () => {
  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-black">Nota</label>
        <textarea
          
          className=" h-10 rounded text-base p-2 border border-gray-300"
          rows={10}
          cols={15}
        ></textarea>
      </div>
    </>
  );
};

export default formStep4;
