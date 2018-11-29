const router = require("express").Router();

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route. If a user who is
// not logged in tries to access this route they will be redirected to the
// signup page
router.get("/members", isAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

// Route for logging user out (hit this with an <a> link)
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


module.exports = router;