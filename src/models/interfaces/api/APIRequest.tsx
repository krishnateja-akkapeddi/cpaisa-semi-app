import APIMethod from '../../enum/APIMethod';

export default interface APIRequest {
  url: string;
  method: APIMethod;
  headers: {[key: string]: any};
  body?: {};
  abort?: AbortController | null;
}
