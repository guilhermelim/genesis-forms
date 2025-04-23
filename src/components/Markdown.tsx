import ReactMarkdown from "react-markdown";

export default function Markdown(
  props: React.ComponentProps<typeof ReactMarkdown>
) {
  return (
    <ReactMarkdown
      {...props}
      components={{
        a: (linkProps) => (
          <a {...linkProps} target="_blank" rel="noopener noreferrer" />
        ),
      }}
    />
  );
}
