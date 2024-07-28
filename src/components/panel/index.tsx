import { FC, HTMLAttributes } from "react";
interface PanelProps extends HTMLAttributes<HTMLDivElement>  {
    //name: string;
}

export const Panel: FC<PanelProps> = ({children, className, ...props}) => {
  return (
    <div className={`panel-container ${className}`} {...props} >
      {children}
    </div>
  )
}
