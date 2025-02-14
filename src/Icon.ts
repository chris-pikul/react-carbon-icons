import { IconDefinitions, type IconKey } from "./manifest";
import CVG, { type CVGProps } from "./CVG";
import { useMemo } from "react";

export type IconProps = Omit<CVGProps, "def"> & {
  /**
   * Required name, or "key" for the icon. Must reflect an entry in the
   * {@link IconDefinitions} manifest file.
   */
  name: IconKey;
};

/**
 * Single Icon component which can use a `name` property to reference any of the
 * available icons in the {@link IconDefinitions} manifest.
 *
 * @note This references the large barrel file which is the manifest. Meaning using
 * this component *may* include ALL the icons available. Instead it is preferred
 * to use individual imports using the `react-carbon-icons/icons/*` imports instead.
 *
 * @param props Any valid SVG property.
 * @param props.name Required icon key.
 * @returns SVG by means of CVG.
 */
export function Icon(props: IconProps) {
  return CVG({
    ...props,
    def: IconDefinitions[props.name],
  });
}
export default Icon;
