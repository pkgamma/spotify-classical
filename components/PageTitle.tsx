import { ChevronLeft, StepBackIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export default function PageTitle({ title }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between flex-col overflow-hidden w-full">
      <div className="flex items-center flex-col pt-16 pb-12">
        <h1 className="font-serif text-center text-xl">{title}</h1>
      </div>
    </div>
  );
}
