"use client";
import useDetectWindowSize from "@/hooks/useDetectWindowSize";
import { useRef } from "react";

export interface IInitializer {}

export default function Initializer({}: IInitializer) {
  const initialized = useRef<boolean>(false);

  useDetectWindowSize();

  if (!initialized.current) {
    initialized.current = true;
  }

  return null;
}
