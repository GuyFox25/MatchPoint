// Import AES encryption and CryptoJS library
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

// Function to encrypt a string using a password
export function encrypt(str, pass) {
    return AES.encrypt(str, pass).toString();
}

// Function to decrypt an encrypted string using a password
export function decrypt(encrypted_str, pass) {
    return AES.decrypt(encrypted_str, pass).toString(CryptoJS.enc.Utf8);
}