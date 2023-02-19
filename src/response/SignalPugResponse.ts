import { SignalPug } from "../models/SignalPug";
import { SignalFactory } from "../models/SignalFactory";
import { SignalResponse } from "./SignalResponse";

export interface SignalPugResponse extends SignalPug {}

export function signalPugResponse(signal: SignalPug): SignalPugResponse {
  return {
    ...signal,
  };
}

export function signalsPugToResponse(
  signalFactories: SignalPug[]
): SignalPugResponse[] {
  const result: SignalPugResponse[] = [];
  signalFactories.forEach((value) => result.push(signalPugResponse(value)));
  return result;
}
