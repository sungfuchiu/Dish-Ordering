function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidPrice(value) {
  const regex = /^\d+(?:[.,]\d+)*$/; 
  return value && regex.test(value);
}

function isValidImageUrl(value) {
  return value && value.startsWith('http');
}

function isValidEmail(value) {
  return value && value.includes('@');
}

exports.isValidText = isValidText;
exports.isValidPrice = isValidPrice;
exports.isValidImageUrl = isValidImageUrl;
exports.isValidEmail = isValidEmail;