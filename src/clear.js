const fs = require('fs').promises;

const main = async (pathsToDelete) =>
    Promise.all([pathsToDelete.map(p => fs.rm(p, { recursive: true }))])
;
main(process.argv.slice(2));