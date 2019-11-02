// **2 creat real web server that loads html file to the browser
const http = require("http");
const fs = require("fs");
const path = require("path");

const Server = http.createServer((req, res) => {
  // req.url  => its where people requesting
  /*
  // homepage req
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "Public", "index.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
    // about page req
  } else if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "Public", "about.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
    // dealing with rest api or microservice in nodejs
  } else if (req.url === "/api/users") {
    // create json file
    const users = [{ name: "mayow", age: 23 }, { name: "ali", age: 25 }];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }

*/
  // ====> Build dynamic file path so we can load css and images of the file

  // set filepath
  let filepath = path.join(
    __dirname,
    "Public",
    req.url === "/" ? "index.html" : req.url
  );
  // egt extention type
  let extname = path.extname(filepath);

  // intial contentType
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
  }

  // Read file
  fs.readFile(filepath, (err, content) => {
    if (err) {
      // page not found error
      if (err.code == "ENOENT") {
        fs.readFile(path.join(__dirname, "Public", "404.html"), (err, data) => {
          res.writeHead(200, { "Content-type": "text/html" });
          res.end(data, "utf8");
        });
        // Server error
      } else {
        res.writeHead(500);
        res.end(`Server Error${err.code}`);
      }
    } else {
      // succes
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});
const PORT = process.env.PORT || 5000;
Server.listen(PORT, () => console.log(`server runing on porst ${PORT}`));
