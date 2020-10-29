module.exports = function validateBody(validationSchema) {
  return async function (req, res, next) {
    try {
      const { body } = req;
      req.body = await validationSchema.validate(body);
      next();
    } catch (err) {
      next(err);
    }
  };
};
