"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/component/molecules/Dashboard";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { getCookie } from "cookies-next";
import { Spin, message } from "antd";

export default function Page() {
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   const token = getCookie("token");
  //   if (!token) {
  //     message.error("Please login first");
  //     const timer = setTimeout(() => {
  //       router.replace("/login");
  //     }, 1500);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [router]);

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  return (
    <GeneralPageContainer>
      <Dashboard />
    </GeneralPageContainer>
  );
}
