import { createElement, type ReactNode, type ComponentProps } from "react";

/**
 * Defines a shape/path for SVG. Can either be a single string in which case it
 * is interpreted as a <path /> "d" attribute (definition.)
 *
 * All other shapes require usage of a tuple in which the first entry is the
 * tag identifier ("circle", "rect", etc.) and the second entry is the attributes
 * as defined in an object.
 */
export type CVGShape = string | [string, Record<string, string>];

/**
 * Defines the definition for an SVG image. The first entry is the `viewBox`
 * definition, all further entries are {@link CVGShape} tuples which make up
 * the SVG shape.
 */
export type CVGDefinition = [string, ...CVGShape[]];

/**
 * Hydrates CVG definition into React compatible SVG nodes. This only hydrates the
 * children and not the root `<svg />` element.
 *
 * @param {CVGDefinition} def CVG Definition Tuple
 * @returns {ReactNode} SVG children
 */
function hydrateCVG(def: CVGDefinition): ReactNode[] {
  return def.slice(1).map((entry) => {
    if (typeof entry === "string")
      return createElement("path", { d: entry, fill: "currentColor" });
    return createElement(entry[0], entry[1]);
  });
}

export type CVGProps = ComponentProps<"svg"> & {
  /**
   * Required definition for the generated SVG. See the definition for the
   * type to see how to form this value.
   *
   * @see {@link CVGDefinition}
   */
  def: CVGDefinition;

  /**
   * Optional alternative text for the SVG element which will be inserted into
   * a child `<title />` element. Does not replace the need for `aria-` attributes
   * but can satisfy a lot of the a11y requirements.
   */
  alt?: string;
};

/**
 * Compressed Vector Graphics component. The idea is to compress SVG images even
 * further to reduce bundle bloat. SVG's are defined using smaller JSON tuples and
 * the generic XML attributes are removed.
 *
 * @param props Accepts all properties that `<svg />` does with two additionals.
 * @param props.def Required CVG definition for the image.
 * @param props.alt Optional alternate text to be inserted into a `<title />` element.
 * @returns `<svg />` node.
 */
export function CVG(props: CVGProps) {
  const svgProps = {
    ...props,
    viewBox: props.def[0],
    def: undefined,
    alt: undefined,
  } as ComponentProps<"svg">;

  return createElement(
    "svg",
    svgProps,
    props.alt ? createElement("title", null, props.alt) : null,
    ...hydrateCVG(props.def)
  );
}
export default CVG;
