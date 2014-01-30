var fs = require('fs');

var file = '/example/database.json',
    questions;



fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  console.dir(data);
});