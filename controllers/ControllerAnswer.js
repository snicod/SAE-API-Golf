/**
 * ControllerAnswer is a class that encapsulate any answer from a control function
 * A single instance of this class must be used for all the modules, so this single
 * is created here, namely answer, and exported instead of the class itself.
 *
 * In case of an "internal" function (as in helpers.controller), it is used to report a process result
 * to another function. If the function is directly called when a route is resolved, then answer can be used
 * as a result to send to the requester (i.e. the front-end)
 *
 * err is an integer, equal to the error code, and 0 if the result is NOT an error.
 * status can be used as a complement of error, and here, is used to store the http resposone status (like 2XX, 4XX, 5XX)
 * data contains the real result, which is of any type. Rk: if err>0, data is generally a string that is the error message.
 *
 * Rk: for consistency and simplicity to implement the front-end, it is advisable to always use answer as the object sent
 * back to the front for any route.
 */
class ControllerAnswer {

  constructor() {
    if (ControllerAnswer.exists) {
      return ControllerAnswer.singleton
    }
    this.error = 0
    this.status = 200
    this.data = null
    ControllerAnswer.exists = true
    ControllerAnswer.singleton = this
    return this
  }

  /**
   * reset the fields to default state
   * CAUTION: normally, each controller function should call this function as their first instruction.
   */
  reset() {
    this.error = 0
    this.status = 200
    this.data = null
  }

  /**
   * set each of the three fields with a JSON object containing the same 3 fields.
   * @param obj
   */
  set(obj) {
    this.error = obj.error
    this.status = obj.status
    this.data = obj.data
  }

  /**
   * set only the err field
   * @param err
   */
  setError(error) {
    this.error = error
  }

  /**
   * set only the data field
   * @param data
   */
  setPayload(data) {
    this.data = data
  }

  /**
   * get the data field value
   * @return {null}
   */
  getPayload() {
    return this.data
  }

  /**
   * test if there is an error
   * @return {boolean}
   */
  isError() {q
    return this.error !== 0;

  }

  /**
   * get the error code
   * @return {number}
   */
  getError() {
    return this.error
  }
}

// create a single instance that is the only object exported
// Rk: the constructor is written to avoid that another call to new creates a new instance => singleton
const answer = new ControllerAnswer()

module.exports = {
  answer
}
