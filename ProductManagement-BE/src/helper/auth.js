const { expressjwt: jwt } = require("express-jwt");

module.exports = auth;


function auth(roles) {
  let secret =  process.env.JWT_SECRET;
  return [
      // authenticate JWT token and attach user to request object (req.user)
      jwt({ secret, algorithms: ['HS256'] }),

      // authorize based on user role
      (req, res, next) => {
          if (roles && !roles.includes(req.auth.role)) {
              // user's role is not authorized
              return res.status(401).json({ message: 'Unauthorized' });
          }

          // authentication and authorization successful
          next();
      }
  ];
}