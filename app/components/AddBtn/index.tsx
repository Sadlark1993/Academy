import { MouseEvent } from "react";

export const AddBtn = ({children, callback, light=false}: {children:string, callback:(event:MouseEvent)=>void, light?: boolean}) => {

  const className = light ? 'h-12 py-3 px-4 bg-[#F9F8FF] rounded-xl text-[#7357ff] font-[GeneralSans] border border-[#E2DCFF]' 
    : 'h-12 py-3 px-4 bg-[#7357ff] rounded-xl text-white font-[GeneralSans]';
  
  return (
    <button onClick={callback} className={className}>{children}</button>
  );
}

//border: 1px solid rgba(226, 220, 255, 1)