// This file is required to use @next/mdx in the `app` directory.
// TODO: don't know what the type is
export function useMDXComponents(components: unknown) {
  return components
  // Allows customizing built-in components, e.g. to add styling.
  // return {
  //   h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
  //   ...components,
  // }
}
