(function (root) {
  'use strict';
  function calculate(input) {
    const keys = ['quantity', 'purchase', 'freight', 'expenses', 'selling', 'annualRate', 'days'];
    for (const key of keys) {
      if (typeof input[key] !== 'number' || !Number.isFinite(input[key]) || input[key] < 0)
        throw new Error('Enter a valid, non-negative number for ' + key + '.');
    }
    if (input.quantity === 0) throw new Error('Quantity must be greater than zero.');
    const kg = input.quantity * 1000;
    const purchaseTotal = kg * input.purchase;
    const landedTotal = purchaseTotal + input.freight + input.expenses;
    const landedPerKg = landedTotal / kg;
    const financeCost = landedTotal * input.annualRate / 100 * input.days / 365;
    const breakEven = (landedTotal + financeCost) / kg;
    const revenue = input.selling * kg;
    const profit = revenue - landedTotal - financeCost;
    const result = {kg, purchaseTotal, landedTotal, landedPerKg, financeCost, breakEven, revenue, profit,
      freightPerTon: input.freight / input.quantity,
      profitPerKg: profit / kg, marginPercent: revenue === 0 ? null : profit / revenue * 100};
    if (Object.values(result).some(value => value !== null && !Number.isFinite(value)))
      throw new Error('These values are too large to calculate.');
    return result;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {calculate};
  else root.ScrapCalculator = {calculate};
})(typeof globalThis !== 'undefined' ? globalThis : this);
