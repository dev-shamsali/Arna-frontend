"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on pages that manage their own navbar
  if (['/checkout', '/login', '/signup', '/profile'].includes(pathname)) {
    return null;
  }

  return <Navbar />;
}
