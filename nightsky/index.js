//express server framework
var express = require("express");
var app = express();
var server = app.listen(5000);
app.use(express.static("public"));

//socket
var socket = require("socket.io");
var io = socket(server); //input output object

