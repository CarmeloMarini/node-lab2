import express = require('express')
import { MetricsHandler } from './metrics'


const app = express()
const port: string = process.env.PORT || '8080'

///metrics 
//const metrics = require('./metrics.ts')


/*///path
path = require('path')
app.use(express.static(path.join(__dirname, 'public')))*/

///views
///app.set('views', __dirname + "/views")
///app.set('view engine', 'ejs');
///app.set('port', 8080)

app.get('/', function (req, res) {    //menu
  res.write('Welcome in the first App : '+
  'path \'/hello\' to display the -hello name- mode.\n\n'+
  ' Path to be completed with parameter NAME :\n'+
  'it displays \'hello name\' \n'+
  'if no name : \'hello anonymous\''+
  'else : error 404')
  res.end()
})


app.get(    //helloanonymous page
'/hello', 
(req, res) => res.send("hello anonymous")
)

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.get(    //hello name page
  '/hello/:name', 
  (req, res) => res.render('hello.ejs' ,{name: req.params.name})
)


app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})