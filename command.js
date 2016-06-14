function pwd() {
  var args = [].slice.call(arguments);
  var cmd = args[0];
  if (cmd === 'pwd') {
    process.stdout.write(process.argv[1] + '\n');
  }
  process.stdout.write('prompt > ');
}

function date() {
  var args = [].slice.call(arguments);
  var cmd = args[0];
  if (cmd === 'date') {
    var now = new Date();
    var dateStr = now.toString();
    process.stdout.write(dateStr + '\n');
  }
  process.stdout.write('prompt > ');
}

module.exports = {
  pwd: pwd,
  date: date,
}
