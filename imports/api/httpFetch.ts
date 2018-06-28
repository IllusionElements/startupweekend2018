import { HTTP as MeteorHTTP } from 'meteor/http'
import { RequestOptions } from 'https';
import { reject } from 'async';

interface HTTPOptions {
  content?: string,
  data?: JSON,
  query?: string,
  params?: {
    [field: string]: string,
  },
  auth?: string,
  headers?: {
    [field: string]: any
  },
  timeout?: Number,
  followRedirects?: Boolean,
  npmRequestOptions?: RequestOptions,
  beforeSend?: (...args: any[]) => any,
}

function promiseResolver(callback: (...args: any[]) => void, ...args: any[]): any {
  return (resolve: (result: any) => PromiseLike<{}>, reject: (error: any) => Promise<{}>) => (
    callback(...args, (err: any, result: any) => (
      err
        ? reject(err)
        : resolve(result)
    ))
  )
}


const httpCallPromiseResolver= function Resolver(this: HTTPFetch, method: string, url?: string, options?: HTTPOptions) {
  return new Promise(promiseResolver(this.HTTP.call, method, url, options))
}


const http = (method: string) => (target: HTTPFetch, propKey: string, descriptors: PropertyDescriptor): void => {
  descriptors.value = function asyncMethod(url?: string, options?: HTTPOptions) {
    if(!options) {
      options = {}
    }
    return <HTTPFetch>httpCallPromiseResolver.bind(target)(method, url, options)
  }
}

const call = (target: HTTPFetch, propKey: string, descriptors: PropertyDescriptor): void => {
  descriptors.value = function callAsync(method: string, url: string, options: HTTPOptions) {
    if(!options) {
      options = {}
    }
    return <HTTPFetch>httpCallPromiseResolver.bind(target)(method, url, options)
  }
}

class HTTPFetch {
  constructor (public HTTP: any | HTTP.HTTPRequest = MeteorHTTP) {}

  @call
  public call(method: string, url: string, options?: HTTPOptions) {}

  @http('get')
  public get(url: string, options?: HTTPOptions) {
    return Promise.resolve()
  }

  @http('put')
  public put(url: string, options?: HTTPOptions) {
    return Promise.resolve()
  }

  @http('post')
  public post(url: string, options?: HTTPOptions) {
    return Promise.resolve()
  }

  @http('del')
  public del(url: string, options?: HTTPOptions) {
    return Promise.resolve()
  }
}


export default new HTTPFetch(null)