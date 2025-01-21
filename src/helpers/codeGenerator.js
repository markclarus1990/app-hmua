export const generateCode = () => {
  const randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99999
  const formattedCode = `GHMUA-${randomNumber.toString().padStart(5, "0")}`; // Format to 5 digits
  return formattedCode;
};
