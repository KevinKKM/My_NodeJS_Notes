var http = require("http");
function handler(req,res){
   res.writeHead(200, {"Content-Type":"text/plain"});
   res.write("Hello World");
   res.end();
}
http.createServer(handler).listen(8888);