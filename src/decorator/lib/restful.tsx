const RESTFUL_PAYLOAD_INFO = Symbol('RESTFUL_PAYLOAD_INFO')

export enum RestFulMethod {
  // get
  GET = 'GET',
  // post
  POST = 'POST',
  // delete
  DELETE = 'DELETE',
  // patch
  PATCH = 'PATCH',
  // put
  PUT = 'PUT',
}

export enum RestFulContentType {
  // application/x-www-form-urlencoded
  URL_ENCODE = 'application/x-www-form-urlencoded',
  // multipart/form-data
  FORM_DATA = 'multipart/form-data',
  // application/json
  JSON = 'application/json;charset=utf-8',
  // muilt 一般附件上传使用
  MU_ILT = '',
}

export default class RestFul {}
