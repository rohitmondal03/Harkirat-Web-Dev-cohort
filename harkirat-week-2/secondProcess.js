var sendObj = {
  method: "POST",
}

function logResponseBody(jsonBody) {
  console.log(jsonBody);
}

function callbackFn(result) {
  // result.json().then(logResponseBody)
  console.log(result)
}

fetch("http://localhost:3000/handle?counter=400", sendObj)
  .then(callbackFn)
