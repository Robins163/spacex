// A mock function to mimic making an async request for data
function fetchCount(amount = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: amount }), 500);
    setTimeout(() => reject(Error("Failed async operation")), 100000);
  });
}

export default fetchCount;
