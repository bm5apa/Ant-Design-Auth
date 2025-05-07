import { useGlobalStore } from "@/stores/global.store";
import { useEffect } from "react";

export default function useDetectWindowSize() {
  const setScreenSize = useGlobalStore((state) => state.setScreenSize);
  const updateWindowSize = () => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    updateWindowSize();
    window?.addEventListener("resize", updateWindowSize);
    return () => {
      window?.removeEventListener("resize", updateWindowSize);
    };
  }, []);
}
