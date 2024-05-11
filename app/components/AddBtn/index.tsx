//import { ReactNode } from "react";

export const AddBtn = ({children, callback}: {children:string, callback:()=>void}) => {
  return (
    <button onClick={callback} className="h-12 py-3 px-4 bg-[#7357ff] rounded-xl text-white font-[GeneralSans]">{children}</button>
  );
}

