; (function (name, definition, context) {
  if ((typeof module !== 'undefined') && module.exports)
    module.exports = definition() // node 环境
  else if ((typeof context['define'] === 'function') && (context['define']['amd'] || context['define']['cmd']))
    define(definition)            // amd cmd 规范环境，如 seajs requirejs
  else
    context[name] = definition()  // 浏览器环境
})('MAIN_CONFIG', function () {

  // var API_ROOT = 'http://www.ischool365.com:10892/';
  var API_ROOT = 'http://www.ischool365.com:11582/';
  return {
    // ---------------------------- api prefix ----------------------------
    AUTH_API_ROOT: API_ROOT + 'auth',
    WORK_API_ROOT: API_ROOT + 'homework',
  }

}, this);
