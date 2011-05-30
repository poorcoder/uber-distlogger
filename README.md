# Logger
This logger is built to aggregate all logs from multiple server to have a centralized list of wtf is going on

## Adding new longs
New logs need to be posted to the url `http://logger/posts/new` with a `Content-Type: applications/json` http header.

### Model definition
   {
      time: Number,                                         // (req) Contains the time in milliseconds since 1970 of the log message
      level: String,                                        // (req) Level of the log message `['WARN', 'LOG', 'ERROR']`
      ip:    String,                                        // (req) Source IP Address of the log message 
      line_num: String,                                     // (opt) Line number related to the error/warning/info 
      body: String,                                         // (opt) Any additional information to send with the error (i.e. a stacktrace, detailed error message)
      component: type: String,                              // (req) System that the log message belongs too `['mobile', 'dispatch', 'etc']`
   }

### Example POST request
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
   }
