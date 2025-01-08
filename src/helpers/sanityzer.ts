import xss from 'xss';

export const sanitizeInput = (input: string): string => {
    return xss(input);
}

export const sanitizeNestedInput = (input: any): any => {
    if (typeof input === 'object' && input !== null) {
      const sanitizedObject: any = {};
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          const value = input[key];
          sanitizedObject[key] = typeof value === 'string' ? sanitizeInput(value) : value;
        }
      }
      return sanitizedObject;
    }
    return sanitizeInput(input);
};

  