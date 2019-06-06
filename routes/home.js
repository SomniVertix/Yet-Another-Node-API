
// Place for unauthorized user
module.exports = (app) => {
  app.get("/", function(req, res, next) {

    res.send({ Home: "Home" });
    next();
  });
};
