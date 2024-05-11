import { useParams } from "@remix-run/react";
import { ReactNode } from "react";
import { AddBtn } from "~/components/AddBtn";
import { Step } from "~/components/Step";

import stepsMock from "~/mock/stepsMock";

const Trail = ():ReactNode => {
  const {trail} = useParams();

  return (
    <>
    <section className="max-w-[800px] mx-auto my-20">
      <div className="flex justify-between mb-10"><h1 className="text-2xl font-[GeneralSans] font-semibold">Título da trilha {trail?.split('-')[1]}</h1>
      <AddBtn callback={()=>console.log('adicionou passo na trilha ' + trail)}>+ Adicionar Passo</AddBtn></div>
      {stepsMock.map((step, index) => <Step key={index} title={step.title} content={step.content}/>)}
    </section> 
    <section className="add-step-bg">
      <div></div>
    </section>
    </>
  )
}

export default Trail;