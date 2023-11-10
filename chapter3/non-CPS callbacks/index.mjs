// This function is neither async or is using a CPS.
// The callback is used just to iterate over the elements
// of the array, and no to pass the result of the operation.
// The result is even returned synchronously.

const result = [1, 2, 3].map((x) => x + 1)

console.log(result)
