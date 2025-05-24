const isUserAdmin = (req, res, next) => {
  const { userRole } = req.user;
  
  if (userRole !== "admin") {
    return res
      .status(403)
      .json([{ message: "You don't have permission to register a movie" }]);
  }

  next();
};
export default isUserAdmin