"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signalsPugToResponse = exports.signalPugResponse = void 0;
function signalPugResponse(signal) {
    return Object.assign({}, signal);
}
exports.signalPugResponse = signalPugResponse;
function signalsPugToResponse(signalFactories) {
    const result = [];
    signalFactories.forEach((value) => result.push(signalPugResponse(value)));
    return result;
}
exports.signalsPugToResponse = signalsPugToResponse;
