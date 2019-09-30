const RESFUL_PAYLOAD_INFO = Symbol('RESFUL_PAYLOAD_INFO')

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
  URLENCODE = 'application/x-www-form-urlencoded',
  // multipart/form-data
  FORMDATA = 'multipart/form-data',
  // application/json
  JSON = 'application/json;charset=utf-8',
  // muilt 一般附件上传使用
  MUILT = '',
}

export default class RestFul {}
