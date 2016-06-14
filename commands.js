var fs = require('fs');
var request = require('request');

function pwd (stdin, file, done) {
  done(process.argv[1]);
}

function date (stdin, file, done) {
  var now = new Date();
  var dateStr = now.toString();
  done(dateStr);
}

function ls (stdin, file, done) {
  fs.readdir('.', function (err, files) {
    if (err) throw err;
    var output = '';
    files.forEach(function (f, i) {
      output += f.toString();
      if (i !== files.length - 1) output += '\n';
    });
    done(output);
  });
}

function echo (stdin, file, done) {
  if (stdin) {
    done(stdin);
    return;
  }
  var output;
  var envArg = file[0].split('');
  if (envArg[0] === '$') {
    var key = envArg.slice(1).join('');
    if (process.env.hasOwnProperty(key)) output = process.env[key];
  } else {
    output = file.reduce(function (str, elem) {
      str += elem + ' ';
      return str;
    }, '');
  }
  done(output);
}

function cat (stdin, file, done) {
  if (stdin) {
    return done(stdin);
  }
  fs.readFile (file, function (err, data) {
    if (err) throw err;
    done(data.toString());
  });
}

function head (stdin, file, done) {
  var lines;
  if (stdin) {
    lines = stdin.split('\n');
    lines = lines.slice(0,5);
    return done(lines.join('\n'));
  }
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    lines = data.toString().split('\n');
    lines = lines.slice(0,5);
    done(lines.join('\n'));
  });
}

function tail (stdin, file, done) {
  var lines;
  if (stdin) {
    lines = stdin.split('\n');
    lines = lines.slice(head.length - 6);
    return done(lines.join('\n'));
  }
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    lines = data.toString().split('\n');
    lines = lines.slice(head.length - 6);
    done(lines.join('\n'));
  });
}

function sort (stdin, file, done) {
  var lines;
  if (stdin) {
    lines = stdin.split('\n');
    lines.sort();
    return done(lines.join('\n'));
  }
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    lines = data.toString().split('\n');
    lines.sort();
    done(lines.join('\n'));
  });
}

function wc (stdin, file, done) {
  var lines;
  if (stdin) {
    lines = stdin.split('\n');
    return done(lines.length.toString());
  }
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    lines = data.toString().split('\n');
    done(lines.length.toString());
  });
}

function uniq (stdin, file, done) {
  var lines;
  var compareLines = function (lines) {
    var newLines = []
    lines.forEach(function (line, index) {
      if (newLines.indexOf(line) === -1) newLines.push(line);
    });
    return newLines
  };
  if (stdin) {
    lines = stdin.split('\n');
    lines = compareLines(lines);
    return done(lines.join('\n'));
  }
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    lines = data.toString().split('\n');
    lines = compareLines(lines);
    done(lines.join('\n'));
  });
}

function curl (stdin, file, done) {
  request(url, function (err, response, body) {
    if (err) throw err;
    if (!err && response.statusCode == 200) {
      done(body);
    }
  });
}

module.exports = {
  pwd: pwd,
  date: date,
  ls: ls,
  echo: echo,
  cat: cat,
  head: head,
  tail: tail,
  sort: sort,
  wc: wc,
  uniq: uniq,
  curl: curl
};

