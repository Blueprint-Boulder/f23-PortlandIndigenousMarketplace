// successResponse.js
function sendSuccessResponse(req, res) {
  if(!res.headersSent){
    if (res.locals.data) {
      // console.log('Data in res.locals', res.locals.data);
      res.status(200).json(res.locals.data);
    } else {
      // Fallback if no data is set in res.locals, but middleware is called
      res.status(200).json(
          {
            status: 'success',
            message: 'Operation completed successfully.',
          },
      );
    }
  }
  else {
    console.error("sendSuccessResponse: Headers already sent!");
  }
}

module.exports = sendSuccessResponse;
