import { ReactNode } from "react"

export const Step = ({title, content}: {title: string, content: string}): ReactNode => {
  return (
    <div className="bg-white mt-6 p-6 flex flex-col gap-2 rounded-lg border border-[#E2E2E4] font-[GeneralSans]">
      <h3 className="text-lg font-semibold text-[#110c22]">{title}</h3>
      <p className="text-base text-[#4F4B5C]">{content}</p>
    </div>
  )
}