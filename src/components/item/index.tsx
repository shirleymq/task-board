import { FC, HTMLAttributes } from "react";

interface ItemProps extends HTMLAttributes<HTMLDivElement>  {
 
}

export const Item: FC<ItemProps> = ({ className, children, ...otras }) => {
  return <div className={`container ${className}`} {...otras} draggable>
    {children}
  </div>;
};
