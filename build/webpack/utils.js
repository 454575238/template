const path = require('path')
const HappyPack = require('happypack')
const os = require('os')
const happyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const resolve = userPath => {
  return path.resolve(__dirname, '../../', userPath)
}

const createHappyPlugin = (id, loaders) =>
  new HappyPack({
    id,
    loaders,
    threadPool: happyPackThreadPool,
  })

module.exports = { resolve, createHappyPlugin }
