import { FC, HTMLAttributes, PropsWithChildren } from "react";

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  data: any;
  position: number;
  updateTargetIndex: (index: number) => void;
};

export const Item: FC<PropsWithChildren<ItemProps>> = ({
  className,
  children,
  data,
  position,
  updateTargetIndex,
  ...props
}) => {
  return (
    <div
      onDragStart={(e) => {
        e.dataTransfer.setData("item/id", data.id.toString());
        e.stopPropagation();
        console.log("arrastre iniciado ITEM", data.details);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const rect = e.currentTarget.getBoundingClientRect();
        const midY = rect.top + rect.height / 2; // Calcula la mitad vertical del item
        console.log("position index", position);
        if (e.clientY < midY) {
          console.log("Cursor en la mitad superior del item");
          updateTargetIndex(position);
        } else {
          console.log("Cursor en la mitad inferior del item");
          updateTargetIndex(position + 1);
        }
      }}
      className={`container ${className}`}
      {...props}
      draggable
    >
      {children}
    </div>
  );
};
