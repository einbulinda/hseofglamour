import LoadingIcon from "@/base-components/LoadingIcon";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <LoadingIcon icon="circles" className="w-1/3 h-1/3" />
    </div>
  );
};

export default Loading;
