import Image from "next/image";

export default function Row({ cover, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 py-4 px-4 bg-white hover:bg-gray-50 transition-colors duration-100 cursor-pointer">
      {cover && (
        <Image
          src={cover}
          alt={title}
          width={128}
          height={128}
          className="w-16 h-16"
        />
      )}
      <div className="flex flex-col">
        <h3 className="">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
