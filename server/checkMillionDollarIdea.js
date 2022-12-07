const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  const totalRevenue = Number(numWeeks) * Number(weeklyRevenue);

  const checkFailed = !numWeeks || !weeklyRevenue || isNaN(totalRevenue) || totalRevenue < 1000000;
  if (checkFailed) {
    const errorMessage = "Invalid inputs or revenue less than $1 million.";
    res.status(400).send(errorMessage);
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;