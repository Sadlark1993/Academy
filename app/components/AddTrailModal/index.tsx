import {useState, useEffect, MouseEvent, useRef} from "react";

import { AddBtn } from "../AddBtn"
import Neo4j from "~/consumer/neo4j";
import { useNavigate } from "@remix-run/react";

export const AddTrailModal = ({trail, onOutsideClick, active = false}: {trail: string|undefined, onOutsideClick: (event:MouseEvent)=>void, active:boolean}) => {
  const [toggle, setToggle] = useState('');
  //setToggle(active? 'active': '');

  const idRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(()=>{
    setToggle(active ? 'active': '');
  },[active]);

  const handleAddTrail = async (event:MouseEvent) => {
    event.preventDefault();
    if(trail && idRef.current){
      const result = await Neo4j.saveTrail({id: trail, title: titleRef.current!.value});
      console.log(result);
      if(!result)
        window.alert('Passo não foi salvo no banco.')
      else
        navigate(0);

    }
  }
  
  //cleans the fields and closes the modal.
  const handleCancel = (event:MouseEvent) => {
    event.preventDefault();
    if(idRef.current){
      navigate('/explore/trail-1', {});
    }
    onOutsideClick(event);
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <section onClick={onOutsideClick} className={"add-step-bg "+toggle}>
      <form className="w-[680px] bg-white p-12 flex flex-col gap-10  rounded-3xl font-semibold">
        <h1 className="text-2xl font-semibold text-black">Trilha não Cadastrada</h1>
        <div className="flex flex-col">
          <label className="font-semibold text-sm text-[#4F4B5C] pl-1 pb-1" htmlFor="id">id</label>
          <input ref={idRef} className="modal-input"  type="text" name="id" id="id" value={trail} disabled={true}/>
          <label className="font-semibold text-sm text-[#4F4B5C] pl-1 pb-1" htmlFor="title">Título</label>
          <input ref={titleRef}className="modal-input" type="text" name="title" id="title" />
        </div>
        <div className="flex justify-end gap-6">
          <AddBtn callback={handleCancel} light={true}>Cancelar</AddBtn>
          <AddBtn callback={handleAddTrail}>Criar Trilha</AddBtn>
        </div>
      </form>
    </section>
  )
}