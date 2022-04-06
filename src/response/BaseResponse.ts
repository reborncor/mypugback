
export default interface BaseResponse<T> {
    code: number,
    message : string,
    payload? : T,
}
