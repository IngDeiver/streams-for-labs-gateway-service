"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sign = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var sign = function (data) {
    var privateKey = "-----BEGIN RSA PRIVATE KEY-----\n    MIIEpAIBAAKCAQEAst0QhV3d+owVRDE9qy1RjqG67cij32bt+0PutmZKzGnU2+A6\n    JQ2wxTg9q89MoYN+mnyNgcURMwgK+MbyfvqWLSaNK88KexI2GQ4IDFLldHk25VSZ\n    HnrkYBl9vxIqGYSlWRGlTVPoCCvx8f+CNCyVomEU9g98N0cUtp/873hSp6jEyzP7\n    6ZKP9gY7ykF8QcjnpU/+5gPxlBtdp69c7VUREk8654NskW6HVgGVJLE3hAUGcvdF\n    FGIJhslDgA864e5v6/vG5xL5wutFMIoGALNPVq2BgZ50wnqP0s/Zgw8bCtZQCQH1\n    Elxmr7heStYxGqM9La1mfQs9ZBitEiNud8VGWwIDAQABAoIBACSvlu3j3N3A0bPU\n    7bMobmv03CRdXM87i2BYBKRAwuK+ajxW91YWQsWQzYVp1WvjTppdJaESTH7NDYMN\n    Ozu0Jg1ItPfhVWL8zz/AUwJEFnAXVJ0hBu7rgd/8GoCQNzZYsJleNytvJE5YxR0/\n    rPMKmf5eLzBw6Kdl2ufCVNzBLyLX8PcRt+9viDCvW4vRLjWxVGZAgpJMryRYh/Tx\n    /4XOCfDg1HJ5YlqNnu2KhWnkPrJ9TMiLSdAbCnxhDMMQb7X1qEFJ+gJPY7CB/rik\n    73GqHl4WXY1/Xj4GDRcZQd+PMbiZBER8PpD2As0CMSqCDTA0tgVAc4GMDfCsBoz3\n    GGzCS4ECgYEA38n2H6dLoKBPDex+mW8xiq4TtQksBUo0+hnIeD/nUmbMD6jt9V0j\n    liL2L5cghUmn9up+B/om3Rz2VkKtpCcpgFSrkpZ1gfGfIbyKPqOBfWZl7SqygdT9\n    fBNj0dJvNJHl2pN8jfxJfCbYfxDjFQVSWw/7l665aoojqe3QnckrkGECgYEAzJu4\n    TJnkq8KCCjEp4TTLgYoq8Sy7QI+vr75Qi3m2Hq0is22NLzdXJAbfARCZj1LubKCB\n    udG6/aaCa/YrQiAF/SIH9jkzlDv+CA32tjZaAQNsuUA9p/DferhUqaGY1E7ClR74\n    y0bky1HkcHyVTQYBgBL7fykiLvAp+Ll9LrCbADsCgYEAyKzCGABcwN0ABuxbWhtr\n    wX/4DA79eoDgoKUeLzaeqDWmJyTEvZGXp7oSKPrMHrm99JyyB1U6JG0kOJXyP5Ee\n    lgVXFUv2c1/H4ui+zwyvwVNhcxsml2X3KJv6ltys++cYxrgaqPfirYHoAYmTF/Z9\n    s0rRwWLcwby93lNzDwqmFgECgYB8HoqyjTiWqSvRmvlY0HoTXwmlvAjrpT5iUgTy\n    VycPfN/sEKzw05VdGX32W2eL9jcEVmnbm0rfzD6Z139uYZbAdAB4cULEzY/QuwfK\n    iTYYH0e5KSs90XUAMQnKzWi0ggKwC1XJmnv4ivkU875uNxJ56wn9napK5w3PAFbc\n    F+4vOQKBgQDdE7NdlPVtKrJxVzRWCWRBW5MNHrIzaQxTj8+5h6ClSiMA6Low5KMQ\n    mEc6kHNoQ/TAkZ+VgTXLmvnm1EX5KOumaXdoLfaQ/OYh9JJ2bpU3U3lEciOQK0F3\n    4GVyoIZIdDg1nNFRYSnR2iDmC2MIn5xYKvZJ4E08x/IhEMUs6xb5zw==\n    -----END RSA PRIVATE KEY-----".replace(/\n\s+/g, "\n");
    return jsonwebtoken_1["default"].sign(JSON.stringify(data), privateKey, { algorithm: 'RS256' });
};
exports.sign = sign;
// const verify = (token: string) => {
//     const publicKey = process.env.JWT_PUBLIC_KEY || ""
//     return jwt.verify(token, publicKey)
// }
