import { FC, HTMLAttributes, PropsWithChildren } from "react";

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  data: any;
  position: number;
  updateTargetIndex: (index: number) => void;
  updateHeight: (height: string) => void;
};

export const Item: FC<PropsWithChildren<ItemProps>> = ({
  className,
  children,
  data,
  position,
  updateTargetIndex,
  updateHeight,
  ...props
}) => {
  return (
    <div
      onDragStart={(e) => {
        e.dataTransfer.setData("item/id", data.id.toString());
        const rect = e.currentTarget.getBoundingClientRect();
        const height = rect.height;
        updateHeight(`${height}px`);

        e.stopPropagation();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const rect = e.currentTarget.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        if (e.clientY < midY) {
          updateTargetIndex(position);
        } else {
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
