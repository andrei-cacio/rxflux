'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.basicCacheCreate = basicCacheCreate;

var _immutable = require('immutable');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Cache = (0, _immutable.Record)({ state: new _immutable.Map({}) });

var fluxCache = {
  cache: new Cache(),
  getState: function getState() {
    return this.cache.get('state');
  },
  setState: function setState(_ref) {
    var name = _ref.name;
    var initialState = _ref.initialState;

    this.cache = this.cache.update('state', function (state) {
      return state.set(name, initialState);
    });
  }
};

function basicCacheCreate() {
  return _extends({}, fluxCache, {
    updateState: function updateState(_ref2) {
      var name = _ref2.name;
      var newState = _ref2.newState;

      this.cache = this.cache.update('state', function (state) {
        return state.update(name, function (prevState) {
          return prevState.merge(newState);
        });
      });
    },
    getIn: function getIn(path) {
      return this.cache.getIn(['state'].concat(_toConsumableArray(path)));
    }
  });
}