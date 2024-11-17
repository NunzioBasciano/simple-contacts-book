 /**
   * Validates phone number based on length and digits
   * @param phoneNumber - The phone number to validate
   * @returns true if valid, false otherwise
   */
 export const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\d{10,}$/; // Validates at least 10 digits
    return phoneNumberPattern.test(phoneNumber);
  };
