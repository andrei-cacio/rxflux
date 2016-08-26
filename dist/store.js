'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = createStore;
exports.evaluateGetter = evaluateGetter;

var _rxjs = require('rxjs');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _cache = require('./cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fluxCache = (0, _cache.basicCacheCreate)();

function createStore(name, config) {
  var initialState = _immutable2.default.fromJS(config.initialState);
  var stateSubject = new _rxjs.BehaviorSubject(initialState);

  fluxCache.setState({ name: name, initialState: initialState });

  _dispatcher2.default.subscribe(function (actionDispatch) {
    var prevState = fluxCache.getState().get(name);

    if (config.actionMap.hasOwnProperty(actionDispatch.action)) {
      var newState = config.actionMap[actionDispatch.action](prevState, actionDispatch.payload);

      fluxCache.updateState({ name: name, newState: newState });
      stateSubject.next(newState);
    }
  });

  return stateSubject;
}

function evaluateGetter(getter) {
  var _getter = _slicedToArray(getter, 2);

  var path = _getter[0];
  var handler = _getter[1];


  var getterValue = fluxCache.getIn(path);
  return handler.call(null, getterValue);
}