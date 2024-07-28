import { FC, HTMLAttributes, PropsWithChildren } from "react";

type LaneProps = HTMLAttributes<HTMLDivElement> & {
  data: any;
  onDragStart?: (index: number) => void;
  onDropHandle: (sourceId: number, targetId: number) => void;
}

export const Lane: FC<PropsWithChildren<LaneProps>> = ({ children, className, onDragStart, onDropHandle, data, ...props }) => {

  return (
    <div
      onDragStart={(e) => {
        //console.log("Empezo", data.title)
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("lane/data", data.id.toString());
      }}
      onDragOver={(e)=>{
        e.preventDefault(); 
        //console.log("sobre", data.title)
      }}
      onDrop={(e) => {
        //console.log("Solto", data.title)
        let id = parseInt(e.dataTransfer.getData("lane/data"), 10)
        onDropHandle(id, data.id)
        
      }}
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


