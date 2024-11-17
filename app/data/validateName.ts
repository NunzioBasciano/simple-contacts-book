 /**
   * Validates the name length (at least 3 characters)
   * @param name - The name to validate
   * @returns true if valid, false otherwise
   */
 export const validateName = (name: string) => {
    return name.length >= 3; //  Name should have at least 3 characters
  };