import { ChevronLeft, StepBackIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export default function PageTitle({ title }) {
  const router = useRouter();

  return (
    <div className="py-4 px-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button
        className="mt-4"
        variant="secondary"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </Button>
    </div>
  );
}
