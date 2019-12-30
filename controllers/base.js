exports.baseCtrl = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Base view',
        path: '/',
        editing: false
    });
};

