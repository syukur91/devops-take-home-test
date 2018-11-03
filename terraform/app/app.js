const express = require('express')
const app = express()
const async = require('async')
const { Client } = require('pg')
const uuidv1 = require('uuid/v1');
var ip = require("ip");
var fs = require('fs');

var redis = require('redis');
var redisClient = redis.createClient( 6379,process.env.REDIS_HOST);
redisClient.on('connect', function() {
  console.log('Redis client connected');
});
redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

var env = require('node-env-file');
var request=require('request');
env('.env');

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT),
})

setTimeout(function() {
  client.connect()
}, 5000);


var port = process.env.PORT;
var restEndPoint = process.env.REST_ENDPOINT

app.get('/users', function (req, res) {
  request.get(restEndPoint,function(err,response,body){
    res.send(body)
  });
})

app.get('/connections', function (request, response) {
  var uuid = uuidv1();
  var cache = redisClient.set('id-'+uuid, ip.address(), redis.print);
  var result = {}
      result.data = []
  client.query('SELECT * FROM pg_stat_activity;', (err, res) => {
    if (err) {
      response.send(err.stack)
    } else {
      res.rows.forEach((row, index) => {
        if (row.backend_type == "client backend"){
          result.data.push(row)
          
        }
      });
      result.total = result.data.length 
      response.send(result)
    }
  })
})


app.get('/occured', function (request, response) {
var ips = []
      redisClient.keys('id-*', function (err, keys) {
          if (err) return console.log(err);
          if(keys){
              async.map(keys, function(key, cb) {
                redisClient.get(key, function (error, value) {
                      if (error) return cb(error);
                      var job = {};
                      job['id']=key;
                      job['ip_address']=value;
                      cb(null, job);
                  }); 
              }, function (error, results) {
                 if (error) return console.log(error);

                  results.forEach((row, index) => {
                      ips.push(row.ip_address)                    
                  });

                  var counts = {};

                  for (var i = 0; i < ips.length; i++) {
                    var num = ips[i];
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                  }

                  
                  //Create file the occurence of IP
                  fs.writeFileSync("/tmp/occurence.txt", JSON.stringify(counts))
                  response.sendFile('/tmp/occurence.txt')
              });
          }
    });
})

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!')
})