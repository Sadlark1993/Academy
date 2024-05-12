/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "@remix-run/react";
import { ReactNode, useState, MouseEvent, useEffect, useRef } from "react";

import stepsMock from "~/mock/stepsMock";
import { Step } from "~/components/Step";
import { AddStepModal } from "~/components/AddStepModal";
import { AddBtn } from "~/components/AddBtn";
import neo4j from '../consumer/neo4j';
import { AddTrailModal } from "~/components/AddTrailModal";



const Trail = () :ReactNode => {
  const [activeModal, setActiveModal] = useState(false);
  const [steps, setSteps] = useState();
  const [title, setTitle] = useState('');
  const [newTrail, setNewTrail] = useState(false);
  const {trail} = useParams();

  useEffect(()=>{
  if(trail){
    setNewTrail(false);
    (async () => {
      const trailResult = await neo4j.getTrail(trail);
      if(!trailResult.length){
        setTitle("Trilha não cadastrada");
        setNewTrail(true);
      } else {
        setTitle(trailResult[0].get("title"))
      }
    })();

    (async ()=>{
        const result = await neo4j.getStepsByTrail(trail);
      /* @ts-expect-error type unknown */
        setSteps(result);
    })()
  }
  },[trail]);

  const handleOutsideClick = (event:MouseEvent) => {
    if(event.target == event.currentTarget){
      setActiveModal(false);
    }
  }


  return (
    <>
    <section className="max-w-[800px] mx-auto my-20 opacity-65">
      <div className="flex justify-between mb-10">
        <h1 className="text-2xl font-[GeneralSans] font-semibold">{title}</h1>
        {!newTrail && <AddBtn callback={()=>setActiveModal(true)}>+ Adicionar passo</AddBtn>}
      </div>
      {
      /* @ts-expect-error type unknown */
      steps?.map((step, index) => <Step key={step.get("id")} title={step.get("title")} content={step.get("content")}/>)}
    </section>
      <AddStepModal trail={trail} onOutsideClick={handleOutsideClick} active={activeModal}/>
      <AddTrailModal trail={trail} onOutsideClick={handleOutsideClick} active={newTrail}/>
    </>
  )
}

export default Trail;