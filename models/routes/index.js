const cmdbRoutes = require('./cmdb_routes');

//Обработчики маршрутов
module.exports = function(app, db) {
    cmdbRoutes(app, db);
}