"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on checkout page
  if (pathname === '/checkout') {
    return null;
  }
  
  return <Navbar />;
}
