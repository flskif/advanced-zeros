const getPrimeFactorsOf = require("./primes");

// Calculate how many times `factor` occurs among factors of factorial of `number`
// https://www.purplemath.com/modules/factzero.htm
function countFactorInFactorial(number, factor) {
  let pow = factor; // power 1
  let count = 0;
  while (pow <= number) {
    count += Math.floor(number / pow);
    pow *= factor; // power 2, 3, etc
  }
  return count;
}

// Calculate how many trailing zeroes will be presented 
// in factorial of `number` in `base` base system
function getZerosCount(number, base) {
  const basePrimeFactors = getPrimeFactorsOf(base);
  // Now we need to calculate how often group of all prime factors occur among
  // factors of factorial of given number.
  // Some prime factors can occur several times, like 250 = 2 * 5 * 5 * 5, so we
  // can't calculate just how often 5 occurs.
  const factors = {};
  for (let factor of basePrimeFactors) {
    if (factors[factor]) {
      factors[factor].inPrimeFactors++
    } else {
      factors[factor] = {
        inFactorial: countFactorInFactorial(number, factor),
        inPrimeFactors: 1
      }
    }
  }

  const factorsCount = [];
  for (let { inFactorial, inPrimeFactors } of Object.values(factors)) {
    factorsCount.push(Math.floor(inFactorial/inPrimeFactors));
  }

  return Math.min(...factorsCount);
}

module.exports = getZerosCount;
