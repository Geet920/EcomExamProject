export const formatAmount = (amount) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(amount);
};
