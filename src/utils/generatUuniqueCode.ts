import { randomInt } from "crypto";

function generateUniqueCode(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    const randomindex = randomInt(0, characters.length);
    result += characters[randomindex];
  }

  return result;
}
