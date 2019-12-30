//var ObjectID = require('mongodb').ObjectID;
const ConfigItem = require('./../../models/cibase');
var ObjectID = require('mongoose').Types.ObjectId;

//Пока что запросами жестко работаем с коллекцией servers. TODO: сделать параметры, чтобы можно было в зависимости от параметра с разными коллекциями работать
module.exports = function(app) {
    app.get('/cmdb/:id', (req, res) => {
        //Идентификатор из параметров URL можно вытащить с помощью 
        //конструкции req.params.id
        //MongoDB требуется ID не в виде строки, а в виде специального 
        //объекта. Он называется ObjectID
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        //db.collection('servers').findOne(details, (err, item) => {
            ConfigItem.findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        });
    });

    /* Когда приложение получает POST-запрос по пути ‘/servers’, 
    оно исполнит код внутри функции обратного вызова, передав
    ей объект запроса (который содержит параметры запроса или 
    JSON-данные) и объект ответа (который, понятно, 
    используется для ответа). */
    app.post('/cmdb', (req, res) => {
        const server = new ConfigItem({ category: req.body.category
                                        , description: req.body.description
                                        , title: req.body.title
        });

        server.save(server, (err, result) => {
            if (err) {
                console.log(err);
                
                res.send({'error': 'An error has occurred'});
            } else {
               // res.send(result.ops[0]);
                return res.send({ status: 'OK', server: server });
            }
        });
    });

    app.put('/cmdb/:id', (req, res) => {
        const id = req.params.id;
        //const details = { '_id': new ObjectID(id) };

        ConfigItem.findById(id, function (err, server) {
            if(!server) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
    
            server.title = req.body.title;
            server.description = req.body.description;
            server.category = req.body.category;
           
            return server.save(function (err) {
                if (!err) {
                    return res.send({ status: 'OK', server:server });
                } else {
                    if(err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                    }
                    console.log('Internal error(%d): %s',res.statusCode,err.message);
                }
            });
        });
    });

    app.delete('/cmdb/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        ConfigItem.remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send('Server ' + id + ' deleted!');
            }
        });
    });
};