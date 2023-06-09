import Link from "next/link";

function Hanger({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <Link href={link} className="text-sky-500 font-semibold text-sm md:text-base hover:text-sky-700">
      {children}
    </Link>
  );
}

export default Hanger;
