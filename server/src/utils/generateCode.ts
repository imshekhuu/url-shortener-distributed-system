async function generateCode() {
  // Implementation for generating a unique code

  const codeRequired =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * codeRequired.length);
    code += codeRequired[randomIndex];
  }

  return code;
}

export default generateCode;
