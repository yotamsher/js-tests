function do_de_scramble(text) {
  var ds = decryptStringWithXORtoHex(text, KEY);
  ds = ds.split("").reverse().join("");
  var saltLocation = ds.search("&salt");
  ds = ds.substring(0, saltLocation);
  return ds;
}

function do_scramble(text) {
  var saltLen = 5 + Math.floor(20 * Math.random());
  text = text + "&salt=" + generateSalt(saltLen);
  text = text.split("").reverse().join("");
  return encryptStringWithXORtoHex(text, KEY);
}

//from https://stackoverflow.com/questions/33529103/simply-xor-encrypt-in-javascript-and-decrypt-in-java
function encryptStringWithXORtoHex(input, key) {
  var c = "";
  while (key.length < input.length) {
    key += key;
  }
  for (var i = 0; i < input.length; i++) {
    var value1 = input[i].charCodeAt(0);
    var value2 = key[i].charCodeAt(0);

    var xorValue = value1 ^ value2;

    var xorValueAsHexString = xorValue.toString("16");

    if (xorValueAsHexString.length < 2) {
      xorValueAsHexString = "0" + xorValueAsHexString;
    }

    c += xorValueAsHexString;
  }
  return c;
}

function decryptStringWithXORtoHex(input, key) {
  var parts = input.match(/[\s\S]{1,2}/g);

  var c = "";
  while (key.length < parts.length) {
    key += key;
  }
  for (var i = 0; i < parts.length; i++) {
    var value1 = parseInt(parts[i], 16);
    var value2 = key[i].charCodeAt(0);
    var xorValue = value1 ^ value2;
    var origChaar = String.fromCharCode(xorValue);
    c += origChaar;
  }
  return c;
}

function generateSalt(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
