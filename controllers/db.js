exports.baseCtrl = (req, res, next) => {
     res.render('db', {
         pageTitle: 'Database REST API',
         path: '/cmdb',
         editing: false
     });
};

