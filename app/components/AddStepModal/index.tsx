import { AddBtn } from "../AddBtn"

export const AddStepModal = () => {

  return (
    <section className="add-step-bg active">
      <form className="w-[680px] bg-white p-12 flex flex-col gap-10  rounded-3xl font-semibold">
        <h1 className="text-2xl font-semibold text-black">Adicionar passo</h1>
        <div className="flex flex-col">
          <label className="font-semibold text-sm text-[#4F4B5C] pl-1 pb-1" htmlFor="id">id</label>
          <input className="mb-4 rounded-xl bg-[#F8F8F8] border-[#ECECED] border py-3 px-4 text-[#110c22]"  type="text" name="id" id="id" />
          <label className="font-semibold text-sm text-[#4F4B5C] pl-1 pb-1" htmlFor="title">Título</label>
          <input className="mb-4 rounded-xl bg-[#F8F8F8] border-[#ECECED] border py-3 px-4 text-[#110c22]" type="text" name="title" id="title" />

          <label className="font-semibold text-sm text-[#4F4B5C] pl-1 pb-1" htmlFor="title">Conteúdo</label>
          <textarea className="mb-4 rounded-xl bg-[#F8F8F8] border-[#ECECED] border py-3 px-4 text-[#110c22] resize-none" rows={4} name="title" id="title" />
        </div>
        <div className="flex justify-end gap-6">
          <AddBtn callback={()=>console.log('cancelar')} light={true}>Cancelar</AddBtn>
          <AddBtn callback={()=>console.log('Criar passo')}>Criar passo</AddBtn>
        </div>
      </form>
    </section>
  )
}