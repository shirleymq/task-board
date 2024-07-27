import { FC, HTMLAttributes, PropsWithChildren } from "react";
import './lane.css'

type LaneProps = HTMLAttributes<HTMLDivElement> & {

}

export const Lane:FC<PropsWithChildren<LaneProps>> = ({children, ...props}) => {
  return (
    <div {...props}>
      {children}
    </div>
  )
}
