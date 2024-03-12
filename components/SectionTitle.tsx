import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/router";

export default function SectionTitle({ text, more = false, className }) {
  const router = useRouter();

  return (
    <div className={cn("mb-6 flex items-end justify-between", className)}>
      <div className="font-medium">{text}</div>
      {more && (
        <p className="text-sm text-gray-500">
          More
          <ArrowRightIcon className="mb-0.5 ml-0.5 inline-block h-4 w-4" />
        </p>
      )}
    </div>
  );
}
