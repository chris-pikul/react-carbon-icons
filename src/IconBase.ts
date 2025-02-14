import { type ComponentProps } from "react";
import CVG, { type CVGDefinition } from "./CVG";

export type IconBaseProps = ComponentProps<"svg">;
export function IconBase(def: CVGDefinition, props: IconBaseProps) {
  return CVG({ ...props, def });
}
