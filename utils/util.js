function convertNumberToArray(num) {
  var num = num.charAt(0),
    arr = new Array();
  for (let i = 0; i < 5; i++) {
    if (i < num) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;
}

function http(url, callback) {
  wx.request({
    url: url,
    header: {
      'content-type': 'json'
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

function shortName(str) {
  if (str.length > 6) {
    str = str.substring(0, 6) + '...'
  }
  return str;
}

function findName(arr) {
  var new_arr = [];
  arr.forEach(function (item) {
    new_arr.push(item.name)
  })
  return new_arr;
}

function findAvatar(arr) {
  var new_arr = [];
  arr.forEach(function (item) {
    new_arr.push({ name: item.name, avatar: item.avatars.large });
  })
  return new_arr;
}

module.exports.convertNumberToArray = convertNumberToArray;
exports.http = http;
exports.findName = findName;
exports.findAvatar = findAvatar;
exports.shortName = shortName;