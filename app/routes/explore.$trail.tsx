import { useParams } from "@remix-run/react";
import { ReactNode } from "react";
import { Step } from "~/components/Step";

import stepsMock from "~/mock/stepsMock";

const Trail = ():ReactNode => {
  const {trail} = useParams();

  return (
    <section>
      <div><h1>Título da trilha {trail?.split('-')[1]}</h1><button>+ Adicionar passo</button></div>
      {stepsMock.map((step, index) => <Step key={index} title={step.title} content={step.content}/>)}
    </section>
  )
}

export default Trail;