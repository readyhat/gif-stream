const extractFrames = require('gif-extract-frames')
const streamifier = require('streamifier')
 
/**
 * 
 * @param {String} src 
 * @returns 
 */
const gif2array = async (src) => extractFrames({ input: src })
  .catch(err => console.error('Unkown GIF extraction error occurred!', err))

/**
 * 
 * @param {Promise<ndarray>} frames 
 * @returns 
 */
const array2stream = async (frames) => {
  return new Promise( resolve => {
    const { byteOffset, byteLength } = frames.data;
    // TODO: Iterate over frames and return to be passed to Kafka
    const buffer = frames.data.buffer.slice(byteOffset, byteLength + byteOffset)
    const stream = streamifier.createReadStream(buffer);
    resolve(stream);
  })
  .catch(err => console.error('Unknown array to stream conversion error occurred!', err))
}

/**
 * 
 * @param {String} src 
 * @returns 
 */
const gif2stream = async (src) => gif2array(src)
  .then(array2stream)
  .catch(err => console.error('Unknown GIF stream error occurred!', err))

module.exports = gif2stream
