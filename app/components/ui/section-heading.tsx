import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14 text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}