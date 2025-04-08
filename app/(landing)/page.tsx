// Make it even cool and smooth and efficient 

"use client";

import { useEffect } from "react";

// import Products from "../(dashboard)/(routes)/products/page"

import { useRouter, usePathname } from "next/navigation";
import Products from "@/components/Products";

const page = () => {
  const router = useRouter();
  const pathname = usePathname();

  //   useEffect(() => {
  //     // Redirect to /products if the current URL is /
  //     if (pathname === "/") {
  //       router.push("/products");
  //     }
  //   }, [router, pathname]);
  return (
    // <div><Products /></div>
    <div>
      <Products />
    </div>
  );
};

export default page;
