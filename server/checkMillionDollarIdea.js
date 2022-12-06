const checkMillionDollarIdea = (numWeeks, weeklyRevenue) => {
  const convertedWeeks = Number(numWeeks);
  const convertedWeeklyRev = Number(weeklyRevenue)
  const totalRevenue = convertedWeeklyRev * convertedWeeks;
  return totalRevenue >= 1000000;
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
