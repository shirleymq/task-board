import { FC, HTMLAttributes, PropsWithChildren } from "react";

type ItemProps = HTMLAttributes<HTMLDivElement> & {};

export const Item: FC<PropsWithChildren<ItemProps>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={`container ${className}`} {...props} draggable>
      {children}
    </div>
  );
};
