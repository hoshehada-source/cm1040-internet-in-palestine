/* validate.js
   Checks a JSON list before it gets rendered
*/

function validateItems(items, requiredFields) {
  if (!Array.isArray(items)) {
    return { valid: false, message: "the data is not a list." };
  }

  if (items.length === 0) {
    return { valid: false, message: "the list is empty." };
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < requiredFields.length; j++) {
      const field = requiredFields[j];
      const value = items[i][field];

      // check the field is there and not empty
      if (value === undefined || value === null || value === "") {
        return {
          valid: false,
          message: 'item ' + (i + 1) + ' is missing the "' + field + '" field.'
        };
      }
    }
  }

  return { valid: true };
}