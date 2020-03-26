const createError = require('http-errors');

exports.error = function (err, req, res) {
    // Log the error
    console.error('Error occurred at ' + req.originalUrl);
    console.error(err);

    // Create a http error
    const httpError = createError(404, 'There are some internal errors. Please try again.');

    // Send back the response
    if (req.xhr) return res.json({success: false, status: httpError.statusCode, message: httpError.message});
    else return res.send(httpError.message);
};