var CryptoJS = require("crypto-js");
//https://www.linkedin.com/pulse/jshtml5-java-encryption-using-aes-128bit256bit-subhadip-pal
//    https://github.com/mpetersen/aes-example
//https://skalman.github.io/UglifyJS-online/
//https://github.com/abhilekhsingh041992/spring-boot-samples/blob/master/jpa/src/main/java/example/springboot/jpa/filter/HttpLoggingFilter.java
function initJSONParser(CryptoJS) {
    var AesUtil = function (keySize, iterationCount) {
        this.keySize = keySize / 32;
        this.iterationCount = iterationCount;
    };

    AesUtil.prototype.generateKey = function (salt, passPhrase) {
        var key = CryptoJS.PBKDF2(
            passPhrase,
            CryptoJS.enc.Hex.parse(salt),
            {keySize: this.keySize, iterations: this.iterationCount});
        return key;
    };

    AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
        var key = this.generateKey(salt, passPhrase);
        var encrypted = CryptoJS.AES.encrypt(
            plainText,
            key,
            {iv: CryptoJS.enc.Hex.parse(iv)});
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    };

    AesUtil.prototype.decrypt = function (salt, iv, passPhrase, cipherText) {
        var key = this.generateKey(salt, passPhrase);
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText)
        });
        var decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            key,
            {iv: CryptoJS.enc.Hex.parse(iv)});
        return decrypted.toString(CryptoJS.enc.Utf8);
    };

    var iterationCount = 100;
    var keySize = 128;

    window.prepareJSONRequest = function (json) {

        var four = CryptoJS.lib.WordArray.random(keySize / 8).toString(CryptoJS.enc.Hex);
        var salt = CryptoJS.lib.WordArray.random(keySize / 8).toString(CryptoJS.enc.Hex);

        var aesUtil = new AesUtil(keySize, iterationCount);
        var ciphertext = aesUtil.encrypt(salt, four, appVersion, JSON.stringify(json));
        return {sha: four, jwt: salt, kerberos: ciphertext};
    };

}

