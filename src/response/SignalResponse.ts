import { SignalFactory } from "../models/SignalFactory";
import { followerToResponse } from "./FollowerResponse";

export interface SignalResponse extends SignalFactory {}

export function signalToResponse(signal: SignalFactory): SignalResponse {
  return {
    ...signal,
  };
}

export function signalsToResponse(
  signalFactories: SignalFactory[]
): SignalResponse[] {
  const result: SignalResponse[] = [];
  signalFactories.forEach((value) => result.push(signalToResponse(value)));
  return result;
}
