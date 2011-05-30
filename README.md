# Logger
This logger is built to aggregate all logs from multiple server to have a centralized list of wtf is going on

## (WIP) Viewing logs
View logs at `http://logger/`, a webpage with a human readable list of logs with a searchable form

### (WIP) Following logs
Logs will be written to file in human readable format so you can tail/watch/grep the file on the logging server
#### All logs
`http://logger/log`
#### Mobile
`http://logger/log.mobile`
#### Dispatch
`http://logger/log.dispatch`

## (DONE) Adding new logs
Post your log message to the url `http://logger/logs/new` 
For right now it needs a `Content-Type: applications/json` http header.

Also, since mongo is the database back-end, you can pretty much send anything, but this is the recommended format for now (welcome to changes).

(req) = required; (opt) = optional

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
                line_num: 'NSCreditCardController.m:1337',
                body: 'Permission to API call denied',
                component: 'mobile'
            }
        )
    }

You can also send multiple logs with one payload by making data json array of error messages

## (WIP) Logger ticket creation
   Logger will monitor the incoming logs to notice if any dangerous error messages get sent and automatically notify the engineer that owns that department.
   For example, if the iphone app experiences a critical error, the mobile engineer will be emailed with the log of the error message and a ticket for the error will be created.

   `NOTE: Temporarily in memory, will move to mongo soon.`

### How it works
   Engineers are saved in the database as a json object with an `email` and `filter` (Still working on the schema design, will definitely change)

   `email` - engineer's notifaction email

   `filter` - criteria to match against log messages


   Every 30s, logger will query the database for anything that matches the engineers criteria that hasn't been dispatched. If any is found, logger will create a ticket and notify the engineer 

#### Example engineer object
    {                                                                         
        email: 'engineer2@uber.com',·                                                                
        filter: {                                                                                    
           level: 'ERROR',                                                                  
           component: 'dispatch'                                                           
           level: 'ERROR',                                                                      
        }
    }
