import { FC, HTMLAttributes, PropsWithChildren } from "react";

type LaneProps = HTMLAttributes<HTMLDivElement> & {
  data: any;
  onDragStart?: (index: number) => void;
  onDropHandle: (sourceId: number, targetId: number) => void;
};

export const Lane: FC<PropsWithChildren<LaneProps>> = ({
  children,
  className,
  onDragStart,
  onDropHandle,
  data,
  ...props
}) => {
  return (
    <div
      /**onDragStart={(e) => {
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
      */
      onDragOver={(e) => e.preventDefault()} // Permitir el arrastre sobre el carril
      onDrop={(e) => {
        e.preventDefault();
        const itemId = parseInt(e.dataTransfer.getData("item/id"), 10);
        const targetLaneId = data.id;
        onDropHandle(itemId, targetLaneId);
      }}
      className={`lane ${className}`}
      {...props}
      draggable
    >
      {children}
    </div>
  );
};

interface LaneHeaderProps extends HTMLAttributes<HTMLHeadElement> {}
export const LaneHeader: FC<LaneHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`lane-header ${className}`} {...props}>
      {children}
    </div>
  );
};

interface LaneContentProps extends HTMLAttributes<HTMLHeadElement> {}
export const LaneContent: FC<LaneContentProps> = ({
  children,
  className,
  ...otrosProps
}) => {
  return (
    <div className={`lane-scrollbar ${className}`} {...otrosProps}>
      {children}
    </div>
  );
};

interface LaneFooterProps extends HTMLAttributes<HTMLHeadElement> {}
export const LaneFooter: FC<LaneFooterProps> = ({
  children,
  className,
  ...otrosProps
}) => {
  return (
    <div className={`lane-footer ${className}`} {...otrosProps}>
      {children}
      <button className="lane-button"> + Añade una tarjeta</button>
    </div>
  );
};
