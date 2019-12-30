const path          = require('path');
const express       = require('express');
const bodyParser    = require('body-parser');
const db            = require('./config/db');
const mongoose      = require('mongoose');

const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const helloWorldController = require('./routes/helloWorld');
const baseController = require('./routes/base');
const errorController = require('./controllers/error');
const dbController = require('./routes/db');

// ***Hello, Mongo - PART 1***
const ConfigItem = require('./models/cibase');

// app.use((req, res, next) => {
//     ConfigItem.find({title: 'ciTest'})
//       .then(configItem => {
//         req.configitem = configItem;
//         next();
//       })
//       .catch(err => console.log(err));
//   });

// ****************************

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hello', helloWorldController);
app.use(baseController);
app.use('/cmdb', dbController);

mongoose
    .connect(
        db.url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
     .then(result => {
        // ***Hello, Mongo - PART 2***          
        ConfigItem.findOne({title: 'CI'}).then(configitem => {
            if (!configitem) {
                const configItem = new ConfigItem({
                    title: 'ciTest',
                    category: 'testCategory',
                    description: 'test Description'
                });
                configItem.save();
            }
        })
        // ****************************

        require('./models/routes')(app);
        app.listen(3000);
      })
      .catch(err => {
        console.log(err);
      });
    
    