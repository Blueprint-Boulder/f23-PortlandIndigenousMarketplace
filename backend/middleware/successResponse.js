// successResponse.js
function sendSuccessResponse(req, res) {
    if (res.locals.data) {
        res.status(200).json(res.locals.data);
    } else {
        // Fallback if no data is set in res.locals, but middleware is called
        res.status(200).json({ status: 'success', message: 'Operation completed successfully.' });
    }
}

module.exports = sendSuccessResponse;