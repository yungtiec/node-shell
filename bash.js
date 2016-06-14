var commands = require('./commands.js')

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {

  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g);
  var cmdLine = cmdList[0];
  var curCmd = cmdLine.split(' ')[0];
  var curFile = cmdLine.split(' ')[1];
  var curCmdIndex = 0;
  var numCmd = cmdList.length;
  var done = function (output) {
    curCmdIndex++;
    // if cmdList is not empty, output = stdin for the next command
    if (curCmdIndex === numCmd) {
      process.stdout.write(output + '\n');
      process.stdout.write('prompt > ');
    } else {
      cmdLine = cmdList[curCmdIndex];
      curCmd = cmdLine.split(' ')[0];
      commands[curCmd](output, null, done);
    }
  };
  commands[curCmd](null, curFile, done);


  // var file;
  // var output = null;
  // cmdList.forEach(function (command, i) {
  //   var args = command.split(' ');
  //   var cmd = args[0];
  //   if (args.length > 1) {
  //     file = args[1];
  //   }
  //   cmdList.splice(0,1);
  //   commands[cmd](output, file, done);
  // });



  // process.stdout.write('You typed: ' + cmd + '\n');
  // if (cmd === 'pwd') {
  //   process.stdout.write(process.argv[1] + '\n');
  // } else if (cmd === 'date') {
  //   var now = new Date();
  //   var dateStr = now.toString();
  //   process.stdout.write(dateStr + '\n');
  // }
  // process.stdout.write('prompt > ');


});

process.stdin.on('end', function() {
    process.stdout.write('end');

});
