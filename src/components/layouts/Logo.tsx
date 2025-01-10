
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ width = 144, height = 35 }: { width?: number; height?: number }) => {
  return (
    <Link className="flex items-center" href="/">
      <Image priority className="min-w-[144px]  transition-all hover:scale-95" width={width} height={height} src={`/bannner.png`} alt="" />
    </Link>
  );
};
