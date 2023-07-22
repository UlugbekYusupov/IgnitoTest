// Problem 1
function dscount(str, symbol1, symbol2) {
  let count = 0;
  const regex = new RegExp(`${symbol1}(?=${symbol2})`, "gi");
  let match;
  while ((match = regex.exec(str)) !== null) {
    count++;
    regex.lastIndex -= symbol2.length - 1;
  }
  return count;
}

("use strict");
try {
  test(dscount, ["ab___ab__", "a", "b"], 2);
  test(dscount, ["___cd____", "c", "d"], 1);
  test(dscount, ["de_______", "d", "e"], 1);
  test(dscount, ["12_12__12", "1", "2"], 3);
  test(dscount, ["_ba______", "a", "b"], 0);
  test(dscount, ["_a__b____", "a", "b"], 0);
  test(dscount, ["-ab-аb-ab", "a", "b"], 2);
  test(dscount, ["aAa", "a", "a"], 2);
  console.info("Congratulations! All tests passed.");
} catch (e) {
  console.error(e);
}

function test(call, args, count, n) {
  let r = call.apply(n, args) === count;
  console.assert(r, `Found items count: ${count}`);
  if (!r) throw "Test failed!";
}

// Problem 2
// This function takes 3 parameters:  s,a,b
// It searches for the last occurrence of either  a  or  b  in the string  s  and
// returns the index of that occurrence
// If   a  or  b  is not found in the string, it returns -1
function func(s, a, b) {
  if (
    typeof s !== "string" ||
    typeof a !== "string" ||
    typeof b !== "string" ||
    a.length !== 1 ||
    b.length !== 1
  ) {
    throw new Error("Invalid input");
  }
  if (s === "") {
    return -1;
  }
  const aIndex = s.lastIndexOf(a);
  const bIndex = s.lastIndexOf(b);
  if (aIndex !== -1) {
    if (bIndex === -1) {
      return aIndex;
    } else {
      return Math.max(aIndex, bIndex);
    }
  }
  if (bIndex !== -1) {
    return bIndex;
  }
  return -1;
}

// Problem 3
function drawRating(vote) {
  switch (true) {
    case vote >= 0 && vote <= 20:
      return "★☆☆☆☆";
    case vote <= 40:
      return "★★☆☆☆";
    case vote <= 60:
      return "★★★☆☆";
    case vote <= 80:
      return "★★★★☆";
    case vote <= 100:
      return "★★★★★";
    default:
      return "";
  }
}

// Problem 4
function parseUrl(url) {
  const parsedUrl = new URL(url);
  return {
    href: parsedUrl.href,
    hash: parsedUrl.hash,
    port: parsedUrl.port,
    host: parsedUrl.host,
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    origin: parsedUrl.origin,
  };
}
let a = parseUrl(
  "http://haveignition.com:8080/fizz/buzz.css?a=1&b[]=a&b[]=b#foo"
);
console.log(a);
console.log(
  a.href == "http://haveignition.com:8080/fizz/buzz.css?a=1&b[]=a&b[]=b#foo"
);
console.log(a.hash == "#foo");
console.log(a.port == "8080");
console.log(a.host == "haveignition.com:8080");
console.log(a.protocol == "http:");
console.log(a.hostname == "haveignition.com");
console.log(a.pathname == "/fizz/buzz.css");
console.log(a.origin == "http://haveignition.com:8080");