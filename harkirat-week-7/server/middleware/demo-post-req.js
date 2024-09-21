const postReqMiddleware = (req, res, next) => {
  console.log(req.query.age);

  next();
}


module.exports = {
  postReqMiddleware,
}