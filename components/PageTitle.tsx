import { ChevronLeft, StepBackIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export default function PageTitle({ title }) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-between overflow-hidden">
      <div className="flex flex-col items-center pb-12 pt-16">
        <h1 className="text-center font-serif text-xl">{title}</h1>
      </div>
    </div>
  );
}
