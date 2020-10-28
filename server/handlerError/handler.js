module.exports = (err, req, res, next) => {
  const env = res.app.get('env');
  if (env === 'development') {
    res.send(err?.status ?? 500).send({
      errors: [err],
    });
    return;
  }

  res.send(err?.status ?? 500).send({
    errors: [err?.message ?? 'Internal server error'],
  });
};
