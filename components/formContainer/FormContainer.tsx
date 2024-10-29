import { DrawQueryProvider } from "@/features/drawQuery/DrawQueryContext";
import React, { ReactNode } from "react";

type formContainerProps = {
  children: ReactNode;
};

const FormContainer: React.FC<formContainerProps> = ({ children }) => {
  return (
    <DrawQueryProvider>
      <div className="flex flex-col gap-4 h-full w-full">{children}</div>
    </DrawQueryProvider>
  );
};

export default FormContainer;
