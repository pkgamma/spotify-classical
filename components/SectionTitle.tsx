import { ArrowRightIcon, ChevronLeft, StepBackIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export default function SectionTitle({ text, more = false, className }) {
  const router = useRouter();

  return (
    <div className={cn("flex items-end justify-between mb-6", className)}>
      <div className="font-medium">{text}</div>
      {more && (
        <p className="text-sm text-gray-500">
          More
          <ArrowRightIcon className="inline-block w-4 h-4 ml-0.5 mb-0.5" />
        </p>
      )}
    </div>
  );
}
