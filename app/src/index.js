const gif2stream = require('./gif2stream');
const produce = require('./produce')

gif2stream(process.argv[2])
  .then(stream => produce(stream))
  .catch(err => console.error('An unknown error occurred!', err))
