// Define a React component renderer for our code blocks.
export const CodeElement = (props: {
  attributes?: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLPreElement> &
    React.HTMLAttributes<HTMLPreElement>;
  children?:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
}) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
