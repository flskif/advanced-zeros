// Returns all prime numbers up to n
// Sieve of Eratosthenes algorithm
// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
// cached for performance

let primesCache = [2];
let lastPrime = 2;

function getPrimesUpTo(n) {
  if (n < lastPrime) return primesCache.filter(p => p <= n);

  const numbers = [];

  // +1 because we already have lastPrime in our cache
  const firstNumber = lastPrime + 1;

  // 1. all numbers from last known prime to n
  for (let i = firstNumber; i <= n; i++) {
    numbers.push(i);
  }

  // 2. initial p is smallest prime number
  let p = lastPrime;

  while (p != null) {
    // 3. cross out all multiples of p, starting from p^2
    for (let i = p; i * p <= n; i++) {
      // -firstNumber because first element has index 0
      numbers[i * p - firstNumber] = null;
    }

    // 4. find next p
    let nextP = null;
    for (let i = p - firstNumber, len = numbers.length; i < len; i++) {
      if (numbers[i] > p) {
        nextP = numbers[i];
        break;
      }
    }

    p = nextP;

    if (p != null) lastPrime = p;
  }

  // 5. filter out crossed numbers
  primesCache = primesCache.concat(numbers.filter(n => n != null));

  return primesCache;
}

// use cache for fast iteration over primes
let primesCacheIndex = 0;

// use this to start iterating
function getFirstPrime() {
  primesCacheIndex = 0;
  return primesCache[primesCacheIndex];
}

function getNextPrime() {
  primesCacheIndex++;

  if (primesCache[primesCacheIndex] == undefined) {
    // pump the cache
    // next prime is approx in log(n), so it's safe to assume that it will be
    // found in n^2
    let previousPrime = primesCache[primesCacheIndex - 1];
    getPrimesUpTo(previousPrime * previousPrime);
  }

  return primesCache[primesCacheIndex];
}

function getPrimeFactorsOf(n) {
  const factors = [];

  while (n != 1) {
    let factor = getFirstPrime();
    while (n % factor != 0 && factor <= n) {
      factor = getNextPrime();
    }

    n = n / factor;
    factors.push(factor);
  }

  return factors;
}

module.exports = getPrimeFactorsOf;
