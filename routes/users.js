const firebaseDb = require("../firebase/firebaseInit");

// Place for authorized user with no permissions
module.exports = app => {
  /**
   * Get all users
   */
  app.get("/users", function(req, res, next) {
    let users = new Array();
    const usersRef = firebaseDb.collection("users");

    usersRef
      .get()
      .then(querySnapsot => {
        querySnapsot.forEach(doc => {
          let data = {
            dept: doc.data().dept,
            name: doc.data().name,
            userId: doc.data().userId
          };
          users.push(data);
        });
      })
      .then(() => {
        console.log(users);
        res.send(users);
        next();
      });
  });
};
