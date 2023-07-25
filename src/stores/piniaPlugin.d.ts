import 'pinia'

declare module 'pinia' {
  interface PiniaCustomProperties {
    global: object
  }
}