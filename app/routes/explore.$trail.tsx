import { useParams } from "@remix-run/react";
import { ReactNode, useState, MouseEvent } from "react";

import stepsMock from "~/mock/stepsMock";
import { Step } from "~/components/Step";
import { AddStepModal } from "~/components/AddStepModal";
import { AddBtn } from "~/components/AddBtn";

const Trail = () :ReactNode => {
  const [activeModal, setActiveModal] = useState(false);
  const {trail} = useParams();

  const handleOutsideClick = (event:MouseEvent) => {
    if(event.target == event.currentTarget){
      setActiveModal(false);
    }
  }

  return (
    <>
    <section className="max-w-[800px] mx-auto my-20 opacity-65">
      <div className="flex justify-between mb-10"><h1 className="text-2xl font-[GeneralSans] font-semibold">Título da trilha {trail?.split('-')[1]}</h1>
      <AddBtn callback={()=>setActiveModal(true)}>+ Adicionar Passo</AddBtn></div>
      {stepsMock.map((step, index) => <Step key={index} title={step.title} content={step.content}/>)}
    </section> 
    <AddStepModal onOutsideClick={handleOutsideClick} active={activeModal}/>
    </>
  )
}

export default Trail;