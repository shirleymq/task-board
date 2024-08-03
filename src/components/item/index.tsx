import { FC, HTMLAttributes, PropsWithChildren } from "react";

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  data: any;
  onDragStart?: (index: number) => void;
};

export const Item: FC<PropsWithChildren<ItemProps>> = ({
  className,
  children,
  onDragStart,
  data,
  ...props
}) => {
  return (
    <div
      onDragStart={(e) => {
        //console.log("Empezo", data.title)
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("lane/data", data.id.toString());
      }}
      onDragOver={(e) => {
        e.preventDefault();
        //console.log("sobre", data.title)
      }}
      onDrop={(e) => {
        //console.log("Solto", data.title)
        const id = parseInt(e.dataTransfer.getData("lane/data"), 10);
        //onDropHandle(id, data.id)
      }}
      className={`container ${className}`}
      {...props}
      draggable
    >
      {children}
    </div>
  );
};
