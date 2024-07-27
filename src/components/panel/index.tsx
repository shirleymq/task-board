import { FC, HTMLAttributes, PropsWithChildren } from "react";
import './panel.css'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
    
}
export const Panel:FC<PropsWithChildren<PanelProps>> = ({children, className, ...props}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
