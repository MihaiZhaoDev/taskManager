exports.error = function(err, req, res) {
    console.log('Error occurred at ' + req.originalUrl);
    console.error(err);

    if(req.xhr) return res.json({success: false, message: 'Internal error.'});
    else return res.send('There are some internal errors.');
};