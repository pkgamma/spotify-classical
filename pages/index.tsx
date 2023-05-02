import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import TempPlayer from "@/components/TempPlayer";

export default function HomePage() {
  return (
    <div>
      <LeftSidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-56">
        <h1 className="text-2xl font-bold">Home</h1>
        {/* <div className="w-full box-border pb-0 mb-12 pl-8 pr-8">
          <header className="flex flex-col items-center mb-12 text-center">
            <h1 className="text-center p-0 box-border m-0 min-w-0 text-2xl font-bold pl-12 pr-12">
              Composers
            </h1>
          </header>
          <div className="box-border m-0 min-w-0 grid grid-cols-5 gap-6">
            <a className="block border border-solid rounded-lg cursor-pointer select-none relative no-underline">
              <div className="cursor-pointer select-none min-w-0 h-full items-center block flex-col">
                test
              </div>
            </a>
            <a className="block border border-solid rounded-lg cursor-pointer select-none relative no-underline">
              <div className="cursor-pointer select-none min-w-0 h-full items-center block flex-col">
                test
              </div>
            </a>
            <a className="block border border-solid rounded-lg cursor-pointer select-none relative no-underline">
              <div className="cursor-pointer select-none min-w-0 h-full items-center block flex-col">
                test
              </div>
            </a>
            <a className="block border border-solid rounded-lg cursor-pointer select-none relative no-underline">
              <div className="cursor-pointer select-none min-w-0 h-full items-center block flex-col">
                test
              </div>
            </a>
            <a className="block border border-solid rounded-lg cursor-pointer select-none relative no-underline">
              <div className="cursor-pointer select-none min-w-0 h-full items-center block flex-col">
                test
              </div>
            </a>
          </div>
        </div> */}
      </main>
    </div>
  );
}
