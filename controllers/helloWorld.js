exports.helloWorld = (req, res, next) => {
    res.render('helloWorld', {
        pageTitle: 'Hello, World',
        path: '/hello',
        editing: false
    });
};

