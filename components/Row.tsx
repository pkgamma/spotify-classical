import Image from "next/image";

export default function Row({ cover, title, subtitle }) {
  return (
    <div className="flex cursor-pointer items-center gap-4 bg-white px-4 py-4 transition-colors duration-100 hover:bg-gray-50">
      {cover ? (
        <Image
          src={cover}
          alt={title}
          width={128}
          height={128}
          className="h-16 w-16 shadow-md"
        />
      ) : (
        <div></div>
      )}
      <div className="flex flex-col">
        <h3 className="">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
