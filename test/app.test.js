// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../app')
  , assert = require('assert');
var mongoose = require('mongoose'); 
var Log = mongoose.model('Log');

console.log("Running tests...");
module.exports = {
  'GET /': function(){
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Express</title>');
      });
  },
  'Test 404': function(){
      assert.response(app,
      { url: '/oainsodfina' },
      { status: 404, headers: { 'Content-Type': 'text/plain' }},
      undefined);
  },
  'WARN_MOBILE': function(){
      assert.response(app,
      { url: '/logs/new' ,
        method: 'POST', 
        headers: { 'Content-Type' : 'application/json' },
        data: JSON.stringify(
           {
            time: 1306469069405,
            level: 'WARN',
            ip: '127.0.0.1',
            line_num: 'dispatch_server.js:228:2',
            body: 'Permission to API call denied',
            component: 'mobile'
           }
        )
      },
      {},
         function(){
            Log.findOne({
               time: 1306469069405,
               level: 'WARN',
               ip: '127.0.0.1',
               line_num: 'dispatch_server.js:228:2',
               body: 'Permission to API call denied',
               component: 'mobile'
               }, 
               function(err, docs){
                  assert.isNotNull(docs, "WARN MOBILE");
            });
         }
      );
  },
  'INFO_MOBILE': function(){
      assert.response(app,
      { url: '/logs/new' ,
        method: 'POST', 
        headers: { 'Content-Type' : 'application/json' },
        data: JSON.stringify(
           {
            time: 1306469031801,
            level: 'INFO',
            ip: '127.0.0.1',
            line_num: '',
            body: 'Client received dispatch',
            component: 'mobile'
           }
        )
      },
      {},
         function(){
            Log.findOne({
               time: 1306469031801,
               level: 'INFO',
               ip: '127.0.0.1',
               line_num: '',
               body: 'Client received dispatch',
               component: 'mobile'
               }, 
               function(err, docs){
                  assert.isNotNull(docs, "INFO MOBILE");
            });
         }
      );
  },
  'ERROR_DISPATCH': function(){
      assert.response(app,
      { url: '/logs/new' ,
        method: 'POST', 
        headers: { 'Content-Type' : 'application/json' },
        data: JSON.stringify(
           {
            time: 1306469804010,
            level: 'ERROR',
            ip: '127.0.0.1',
            line_num: 'http_client.js:159:20',
            body: 'EINVAL, Invalid argument to rest.ubercab.com:80/:  <?xml version="1.0" encoding="utf-8" ?><ubercab version="1.0.41" token="jfE3nRNElvKAfIMUa5IhUgb82W7mXhqW4c882df9c7e822.61623787" app="driver" device="iphone"><type><msg_type>location</msg_type><location latitude="37.522963" longitude="-122.266399"></location><location_timestamp>2011-05-25 02:00:28</location_timestamp><location_timestamp_utc>2011-05-25 09:00:28</location_timestamp_utc><speed>27.852998</speed></type></ubercab>.  STACKTRACE:  Error    at ClientRequest.<anonymous> (/home/uber/dispatch/lib/http_client.js:159:145)    at ClientRequest.emit (events.js:64:17)    at Socket.<anonymous> (http.js:1214:11)    at Socket.emit (events.js:64:17)    at Array.0 (net.js:830:27)    at EventEmitter._tickCallback (node.js:126:26)',
            component: 'dispatch'
           }
        )
      },
      {},
         function(){
            Log.findOne({
               time: 1306469804010,
               level: 'ERROR',
               ip: '127.0.0.1',
               line_num: 'http_client.js:159:20',
               body: 'EINVAL, Invalid argument to rest.ubercab.com:80/:  <?xml version="1.0" encoding="utf-8" ?><ubercab version="1.0.41" token="jfE3nRNElvKAfIMUa5IhUgb82W7mXhqW4c882df9c7e822.61623787" app="driver" device="iphone"><type><msg_type>location</msg_type><location latitude="37.522963" longitude="-122.266399"></location><location_timestamp>2011-05-25 02:00:28</location_timestamp><location_timestamp_utc>2011-05-25 09:00:28</location_timestamp_utc><speed>27.852998</speed></type></ubercab>.  STACKTRACE:  Error    at ClientRequest.<anonymous> (/home/uber/dispatch/lib/http_client.js:159:145)    at ClientRequest.emit (events.js:64:17)    at Socket.<anonymous> (http.js:1214:11)    at Socket.emit (events.js:64:17)    at Array.0 (net.js:830:27)    at EventEmitter._tickCallback (node.js:126:26)',
               component: 'dispatch'
               }, 
               function(err, docs){
                  assert.isNotNull(docs, "ERROR DISPATCH");
            });
         }
      );
  }
};
