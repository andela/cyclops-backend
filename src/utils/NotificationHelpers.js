/**
 * @description Helper function to set SSE headers
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Void} Returns nothing.
 */
export const setHeaders = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');
};

/**
 * @description Helper function to add event hooks on a model.
 *
 * @param {Object} model - Model to hook events on.
 * @param {String} event - Event to the model to hook to.
 * @param {String} eventName - Name of event to listen for on client side.
 * @param {Function} callback - Function to execute when model event is triggered.
 * @returns {Void} Returns nothing.
 */
export const addHook = (model, event, eventName, callback) => {
  model.addHook(event, eventName, callback);
};

/**
 * @description Helper function to get one or more user attributes.
 *
 * @param {Object} model - Model to get attributes from.
 * @param {String} attribute - Attribute(s) to get from model. It can be an Array<String> | String
 * @returns {Object} Returns selected attribute(s) as object.
 */
export const getUserInfo = (model, attribute = []) => {
  if (attribute instanceof Array) {
    return attribute.reduce(
      (selectedValues, val) => Object.assign(
        selectedValues,
        { [`${val}`]: model[val] }
      ), {}
    );
  }
  return {
    [`${attribute}`]: model[attribute]
  };
};
