# My_NodeJS_Notes
Since I realize that I still not familiar with NodeJS environment, I decide to learn it from a book, and here's my notes.



<B>NodeJS</B>

In short, it's a backend function in JavaScript, in the past, JavaScript has completed language in the early web browser. However, since it only allow for frontend programming, so it's not much people will review this language.



<B>Hello World</B>

very simple: just as following

```javascript
console.log("Hello World");
```

Type this command, and store into a xxx.js file, than run with node xxx.js

(In my case, it's helloworld.js)



<B>Web Application in NodeJS (Simple Web server)</B>

In this time, we have two requirement:

1, when user browsing "http://{my_domain}/start", it'll see the welcome page, within a upload HTML form

2, User can select a image and upload to our server, and it'll return success message after uploaded the image into our server.

To do this, we have to learn a lot of module and analysis with it.

Requirement:

- We have to provide a web interface, so we need a web service
- Since we will provide a different interface with different URL, so we need a request handler
- The service available to handle POST request
- We need to display the contact, not only handle the request
- Finally, we need to implement the image upload feature



In PHP, we need a Apache HTTP server with PHP module

Right now, we only need a NodeJS with some related NodeJS module.



<B>Simple HTTP Server</B>

To write a JavaScript function/service, the best practice is putting different function code in different file. It'll make the whole service much more simpler to read, and allow you have a very clear main file, and just press "node main.js" to execute it.

 

Right now, we just need to create a server.js file. The code as following:

```javascript
var http = require("http");
http.createServer(function(req,res){
   res.writeHead(200, {"Content-Type":"text/plain"});
   res.write("Hello World");
   res.end();
}).listen(8888);
```

The above script will store in Simple_WebServer.js

To run this, we can simply using this command: "node Simple_WebServer.js"

After that, when you press curl http://127.0.0.1:8000, you will see the "Hello World", you can also using browser to browsing this URL, it'll also return "Hello World" too.

The following we will analysis the code:

firstly, we using the http module, which's build-in by NodeJS

Next, we use the createServer and listen with port 8888

To simplify the code, we can also doing "This" thing:

```javascript
var http = require("http");
var server = http.createServer();
server.listen(8888);
```

On the above script, it only open an TCP port 8888, and do nothing, even given no response if you try to connect with this port and send the post/get request.

And do forget one things: The function can by pass through another function

For example, you can also do this:

```javascript
function say(word) {
    console.log(word);
}
function execute(someFunction, value){
    someFunction(value);
}
execute(say, "Hello");
```

In this time, you can see  the function "say" will pass on execute, and the execute will using this function and your given value.

In this time, say function has been used as the pass function to execute, and the input argument value also been pass to the related function.

According to the above example, we can craft the function like this:

``` javascript
function execute(someFunction, value){
    someFunction(value);
}
execute(function(word){console.log(word)},'Hello');
```

In this time, we can see that we try to use the execute function, but the different is that we just using the non-crafted function to pass on the execute first argument as the function, with the value "Hello". Although the function haven't assign any name on it, since it still a completed function, the "execute" method will just use it as a completed function, and return the expected result.

*We can the pass function as anonymous function, and that's one of the main different between another language with JavaScript*

With the above knowledge, we will know how the following function work:

````javascript
var http = require("http");
http.createServer(function(req,res){
   res.writeHead(200, {"Content-Type":"text/plain"});
   res.write("Hello World");
   res.end();
}).listen(8888);
````

As we can see, the function(req,res) just a anonymous function, to make it more clear, we can also allow to use this method too:

```` javascript
var http = require("http");
function handler(req, res){
   res.writeHead(200, {"Content-Type":"text/plain"});
   res.write("Hello World");
   res.end();
}
http.createServer(handler).listen(8888);
````

We will store it into the new file "new_webserver.js"

Why we need to do that? Just for fun?



<B>Event Trigger</B>

In NodeJS, every function should be trigger by event (which as same as Normal JavaScript), and it's meaningful on our Web development.

When we using the http.createServer, we don't just wanna listen in specific port number, we also want to do something. However, since every request will incoming asynchronously, in PHP, we don't need to think about this issue (because everything has been take care by Apache, every new request it'll make a new thread on it)



But in NodeJS, every new request sent on port 8888, the NodeJS will use the following method to handle it (Here's the main concept of NodeJS event handling method).

1, We create a server, and return a value to method which created the web server, when he web server received any request (no matter GET/POST), it'll do the same thing (return a value to the server created method)

2, We don't know when it'll trigger (as we don't know when you'd got your girlfriend), but we do have a request handling place(or method), which is the value returned by us. In this time, we don't really need to care what the function created, no matter the function has been defend or not.

 If you still don't understand what the fuck is going on, you should check out the article from "Felix"(which "Felix"? I don't know, but I think its good if you can search it on google with me)

On the following section, we can try the following script:

````javascript
var http = require("http");
function handler(req, res){
   console.log("Request received.");
   res.writeHead(200, {"Content-Type":"text/plain"});
   res.write("Hello World");
   res.end();
}
http.createServer(handler).listen(8888);
console.log("Server has been started.");
````

In this time, we can see that when we execute the script, it'll just simply return the server has been started. However, when server receive any request, it'll return the message "Request received", which means the HTTP server running on multi-task, the server script is running on the background, it not only allow to return the single message, it can using the another thread to return a "message received" message too.

*We can it asynchronous*

It's awesome, but why it can do it?

<B>How Server handle those requests?</B>

In the server (http.createServer), we have the following function "onRequest()", and there're two value we have to pass in "req" and "res" (request and response).

When we receive the request, the response.writeHead() will return the HTTP status 200 with the HTTP header type (content-type), and using the response.write() value to return the corresponding text "Hello World"

Right now, we won't looking for any detail, so we haven't handle the request (req) yet. 

Stop in here (page 12/40)