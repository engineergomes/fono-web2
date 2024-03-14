export default function Container({ ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <>
      <section className={`max-w-screen-xl mx-auto py-2  ${props.className}`}>{props.children}</section>
    </>
  );
}
