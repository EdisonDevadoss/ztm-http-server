const http = require('http');

const PORT = 3000;

// It create server
// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'application/json'
//   });

//   res.end(
//     JSON.stringify({
//       name: 'Sir Isaac Newton',
//       id: 1
//     })
//   );
// });

const server = http.createServer();

const friends = [
  {
    name: 'Sir Isaac Newton',
    id: 0
  },
  {
    name: 'Albert Einstein',
    id: 1
  },
  {
    name: 'Nikola Tesla',
    id: 2
  }
];

server.on('request', (req, res) => {
  const items = req.url.split('/');
  if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', (data) => {
      const friend = data.toString();
      console.log('REQUEST:', friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    // res.writeHead(200, {
    //   'Content-Type': 'application/json'
    // });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (items[1] === 'messages') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li> Hello Isaac Newton!</li>');
    res.write('<li> What are your thought on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 400;
    res.end();
  }
});

// We need to our server to listen
// The port number basically used to direct to correct application

server.listen(PORT, () => {
  console.log('Listening on...', PORT);
}); //127.0.0.1 => localhost
