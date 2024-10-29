import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface IconLinkProps {
  children: ReactNode;
  label: string;
}

export function IconLink(props: IconLinkProps) {
  const { children, label, ...rest } = props;

  const router = useRouter();

  const isActive = router.pathname.toLowerCase().includes(label.toLowerCase());

  return (
    <>
      <Link
        href={`/${label.toLowerCase()}`}
        className={`${
          isActive ? "bg-white text-blue-700" : "bg-transparent"
        } p-4 my-3 gap-3 rounded-full flex flex-row items-center hover:bg-white hover:text-blue-700`}
        {...rest}
      >
        {children}
        <span>{label}</span>
      </Link>
    </>
  );
}
