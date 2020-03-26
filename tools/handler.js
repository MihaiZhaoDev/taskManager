const createError = require('http-errors');

/**
 * error
 * Logs the error to the console and send the http error to the client side
 * @param err
 * @param req
 * @param res
 * @returns {this|createServer.NextHandleFunction|any|Promise<any>}
 */
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