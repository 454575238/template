declare module 'react-hot-loader'
declare namespace module {
  export interface HotModule extends NodeModule {
    hot: {
      accept(url: string, callback: (...args: any[]) => void): void
    }
  }
}
