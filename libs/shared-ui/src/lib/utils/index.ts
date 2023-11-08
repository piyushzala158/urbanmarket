function capitalizeFirstLetter(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

export const authError = (error: any) => {
    const errorMessage = error.message;
    const errorMatch = errorMessage.match(/auth\/([^)\s]+)/);
    const userNotFoundText = errorMatch ? errorMatch[1].replace(/-/g, " ") : null;
    const capitalizedText = userNotFoundText ? capitalizeFirstLetter(userNotFoundText) : null;
    return capitalizedText;
  };