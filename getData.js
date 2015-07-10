/*global SpreadsheetApp*/

var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

function getSpreadsheetData(sheetName) {
  // This function gives you an array of objects modeling a worksheet's tabular data, where the first items — column headers — become the property names.
  var arrayOfArrays = spreadsheet.getSheetByName(sheetName).getDataRange().getValues();
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

function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

var responses = getSpreadsheetData('responses').reduce(function (memo, row) {
  Object.keys(row).forEach(function (name) {
    if (!memo.hasOwnProperty(name)) {
      memo[name] = [];
    }
    memo[name].push(row[name]);
  });
  return memo;
}, {});
for (var name in responses) {
  responses[name] = shuffle(responses[name]);
}

var contacts = spreadsheet.getSheetByName('contacts')
                .getDataRange().getValues()
                .reduce(function (memo, row) {
                    if (row[1]) {
                      memo[row[0]] = row[1];
                    }
                    return memo;
                  }, {});
