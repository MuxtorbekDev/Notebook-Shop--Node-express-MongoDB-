module.exports = function (req, res, next) {
  res.status(404).render("404Error", {
    title: "Page Not Found",
  });
};
