declare module 'react-hot-loader'
declare global {
  interface NodeModule {
    hot: {
      accept(url: string, callback: (...args: any[]) => void): void
    }
  }
}

export default global
