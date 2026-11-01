import { randomInt } from "node:crypto";
async function generateCode(length) {
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error("Code length must be a positive integer");
    }
    const codeRequired = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = randomInt(codeRequired.length);
        code += codeRequired[randomIndex];
    }
    return code;
}
export default generateCode;
//# sourceMappingURL=generateCode.js.map