export default function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-line bg-chip px-2.5 py-1 text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
