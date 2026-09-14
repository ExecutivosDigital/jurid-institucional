"use client";

import { useEffect } from "react";
import { capturarPrimeiroContato } from "./acquisition-context";

/** Preserva a campanha da chegada mesmo sem Meta, j.js ou cookies externos. */
export function AcquisitionCapture() {
  useEffect(() => { capturarPrimeiroContato(); }, []);
  return null;
}
