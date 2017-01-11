var express = require('express')

var app = express()

app.set('view-engine','pug')
app.set('views', __dirname);

app.get('*', function(req,res){
    var xx = JSON.stringify({item1: "va'''\"'lu$sQuotee?1", item2: 'value2' })

    res.render('test.pug',{testObj: xx})
})

app.listen(process.env.PORT)
console.log('Test server started')