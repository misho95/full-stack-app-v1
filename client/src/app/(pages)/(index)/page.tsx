import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center gap-5 ">
      <Image
        src="/phone.png"
        alt="phone"
        width={929}
        height={1268}
        className="w-[500px]"
      />
      <div>Form</div>
    </div>
  );
}
