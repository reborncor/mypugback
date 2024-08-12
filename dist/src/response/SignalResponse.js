"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signalsToResponse = exports.signalToResponse = void 0;
function signalToResponse(signal) {
    return Object.assign({}, signal);
}
exports.signalToResponse = signalToResponse;
function signalsToResponse(signalFactories) {
    const result = [];
    signalFactories.forEach((value) => result.push(signalToResponse(value)));
    return result;
}
exports.signalsToResponse = signalsToResponse;
