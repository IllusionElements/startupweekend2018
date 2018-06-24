// @flow

type DefaultConfigType = {
  writable: boolean,
  enumerable: boolean,
  configurable: boolean
}

export const DEFAULT_CONFIG: DefaultConfigType = {
  writable: false,
  enumerable: false,
  configurable: false,
}

export const d = (
  target: { [key: string]: any } | {},
  propKey: string,
  {
    writable,
    enumerable,
    configurable,
  }: DefaultConfigType = DEFAULT_CONFIG,
) => Object.defineProperty(target, propKey, {
  writable,
  enumerable,
  configurable,
})
