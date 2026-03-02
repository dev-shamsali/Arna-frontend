"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on pages that manage their own navbar
  if (['/checkout', '/login', '/signup'].includes(pathname) || pathname.startsWith('/profile')) {
    return null;
  }

  return <Navbar />;
}
