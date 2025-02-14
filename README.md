# React Carbon Icons

Optimized SVG icons from the [IBM Carbon Design System](https://carbondesignsystem.com/elements/icons/library/)
for React. All the available icons in [@carbon/icons](https://github.com/carbon-design-system/carbon/tree/main/packages/icons)
have been optimized using [SVGO](https://svgo.dev/), compressed using a simple
format called CVG (my own creation), and then exported as tiny importable React
components.

## Installation

Pick your favorite flavor:

```console
npm install --save react-carbon-icons
yarn add react-carbon-icons
pnpm add react-carbon-icons
bun add react-carbon-icons
```

## Usage

There are two ways to use the icons. Either by the icon key using the default export,
or by individually importing icons from the `icons/` directory. The latter option
is preferred for bundling and tree-shaking reasons.

### Using &lt;Icon /&gt;

The root-level component `<Icon />` (which is the default export) will give you
access to all the available icons using their "name". The names are all kebab-case
identifiers converted from the original files.

The Icon component accepts any properties that the `<svg />` tag would accept.

```TypeScript
import Icon from 'react-carbon-icons';

export function Foo() {
    return <p>
        Hello, <Icon name='earth-filled' /> World!
    </p>
}
```

The file `react-carbon-icons/manifest` contains all the keys and their path
definitions. You can refer to the [Reference Table](./reference-table.md) for a
complete list of them.

> [!NOTE]
> The Icon component references the manifest file directly, which means depending
> on your bundler, you may end up bundling ALL the icons. This is why the
> [individual import method](#using-individual-imports) is preferred.

### Using Individual Imports

All of the icons are individually exported from single-file components within the
`react-carbon-icons/icons` directory. Each filename is the same as the key. They
are exported both as named components and as the default.

Refer to the [Reference Table](./reference-table.md) for a list of all the available
icon keys and their exported identifier.

## Why not @carbon/icons-react?

I personally found the quality of that library lacking. The SVG is not fully
optimized and the package size is a bit too large for my taste.

## CVG Compression

The idea behind the CVG compression format is to convert the SVG XML source into
machine-readable JSON using as many short-hands and tuples as possible to reduce
the file size of the images. This _should_ result in a lossless conversion which
is easy for JS to hydrate back into SVG.

An example of this is in how _most_ icon files are single paths with a viewBox
attribute on the SVG element. CVG handles this by having the minimum image
definition being `[string, string]`. The first element is the viewBox definition,
and the second being the path definition. Using this we can hydrate the full SVG
again by bringing in the standard namespace and adding the path element.

In cases where the image is more complex, CVG allows for defining the contents of
the image using tuples like `[string, Record<string, string>]`. These definitions
are parsed as being the element tag, followed by an object describing the attributes
and their values.

All together this keeps each icon lean-and-mean for bundling and transmission
purposes. At the time of writing, the original source SVG folder is 2.23mb in size,
while the entire manifest file containing those icons is about 780kb.

## License

This package `react-carbon-icons` is licensed under the same license as the source
material `@carbon/icons` which is Apache 2.0 License. The terms of this license are
provided in the [LICENSE](./LICENSE) file.
