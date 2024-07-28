import { FC, HTMLAttributes, PropsWithChildren } from "react";

type LaneProps = HTMLAttributes<HTMLDivElement> & {
}

export const Lane: FC<PropsWithChildren<LaneProps>> = ({ children, className, ...props }) => {


  return (
    <div
      onDragStart={()=>{console.log("")}}
      className={`lane ${className}`} {...props}
      draggable
    >
      {children}
      <div>
        Footer
      </div>
    </div>
  )
}

interface LaneHeaderProps extends HTMLAttributes<HTMLHeadElement> {
}
export const LaneHeader: FC<LaneHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div className={`lane-header ${className}`}  {...props}>
      {children}
    </div>
  )
}

interface LaneContentProps extends HTMLAttributes<HTMLHeadElement> {
}
export const LaneContent: FC<LaneContentProps> = ({ children, className, ...otrosProps }) => {
  return (
    <div className={`lane-scrollbar ${className}`} {...otrosProps}>
      {children}
    </div>
  )
}


