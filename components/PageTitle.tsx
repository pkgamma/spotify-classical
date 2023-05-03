import { ChevronLeft, StepBackIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export default function PageTitle({ title }) {
  const router = useRouter();

  return (
    <div className="mt-12">
      <header className="flex flex-col items-center my-12 text-center">
        <h1 className="font-serif text-center p-0 box-border m-0 min-w-0 text-2xl font-bold pl-12 pr-12">
          {title}
        </h1>
        {/* <Button
          className="mt-4"
          variant="secondary"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button> */}
      </header>
    </div>
  );
}
