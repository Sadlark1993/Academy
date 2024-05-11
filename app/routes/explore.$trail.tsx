import { useParams } from "@remix-run/react";
import { ReactNode } from "react";

import stepsMock from "~/mock/stepsMock";
import { Step } from "~/components/Step";
import { AddStepModal } from "~/components/AddStepModal";
import { AddBtn } from "~/components/AddBtn";

const Trail = ():ReactNode => {
  const {trail} = useParams();

  return (
    <>
    <section className="max-w-[800px] mx-auto my-20 opacity-65">
      <div className="flex justify-between mb-10"><h1 className="text-2xl font-[GeneralSans] font-semibold">Título da trilha {trail?.split('-')[1]}</h1>
      <AddBtn callback={()=>console.log('adicionou passo na trilha ' + trail)}>+ Adicionar Passo</AddBtn></div>
      {stepsMock.map((step, index) => <Step key={index} title={step.title} content={step.content}/>)}
    </section> 
    <AddStepModal/>
    </>
  )
}

export default Trail;