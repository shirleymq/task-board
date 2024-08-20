import { FC, HTMLAttributes, PropsWithChildren } from "react";

type BlankSpaceProps = HTMLAttributes<HTMLDivElement> & {
  height: string;
};
export const BlankSpace: FC<PropsWithChildren<BlankSpaceProps>> = ({
  className,
  children,
  height,
  ...props
}) => {
  return (
    <div
      className={`blank-space ${className}`}
      style={{ height: height }}
      {...props}
    >
      {children}
    </div>
  );
};
