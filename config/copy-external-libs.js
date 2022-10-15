var copydir = require('copy-dir');
console.log('Copy external-libs starts');
copydir.sync('external-libs', 'src/main/resources/public/external-libs');
console.log('Copy external-libs ends');
