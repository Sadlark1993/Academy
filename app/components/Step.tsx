import { ReactNode } from "react"

export const Step = ({title, content}: {title: string, content: string}): ReactNode => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
}