var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

var responsesSheet = spreadsheet.getSheetByName('responses');
var responses = arraysToObjects(responsesSheet.getDataRange().getValues());
responses = responses.reduce(function (memo, row) {
  Object.keys(row).forEach(function (name) {
    if (!memo.hasOwnProperty(name)) {
      memo[name] = [];
    }
    memo[name].push(row[name]);
  });
  return memo;
}, {});
for (name in responses) {
  responses[name] = shuffle(responses[name]);
}
function debugResponses() {
  Logger.log(responses);
}

var contactsSheet = spreadsheet.getSheetByName('contacts');
var contacts = contactsSheet.getDataRange().getValues();
contacts = contacts.reduce(function (memo, row) {
  if (row[1]) {
    memo[row[0]] = row[1];
  }
  return memo;
}, {});
function debugContacts() {
  Logger.log(contacts);
}

function arraysToObjects(arrayOfArrays) {
  // This function takes an array of arrays — such as the result of someSheet.getDataRange().getValues() — and transforms it
  // to an array of objects, where the first item in the array (column headers) are used as property names
  var headers = arrayOfArrays.shift();
  return arrayOfArrays.map(function (row) {
    return row.reduce(function (memo, value, index) {
      if (value) {
        memo[headers[index]] = value;
      }
      return memo;
    }, {});
  });
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

