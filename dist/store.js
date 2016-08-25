'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _rxjs = require('rxjs');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalState = _immutable2.default.fromJS({
  stores: {},
  state: {}
});

function createStore(obj) {
  var storeId = _uuid2.default.v4();
  var initialState = _immutable2.default.fromJS(obj.initialState);
  var stateSubject = new _rxjs.BehaviorSubject(initialState);

  globalState = globalState.update('stores', function (stores) {
    return stores.set(storeId, obj);
  }).update('state', function (state) {
    return state.set(storeId, initialState);
  });

  _dispatcher2.default.subscribe(function (actionDispatch) {
    var prevState = globalState.get('state').get(storeId);
    if (obj.actionMap.hasOwnProperty(actionDispatch.action)) {
      (function () {
        var newState = obj.actionMap[actionDispatch.action](prevState, actionDispatch.payload);

        globalState = globalState.update('state', function (state) {
          return state.update(storeId, function (store) {
            return store.merge(newState);
          });
        });
        stateSubject.next(newState);
      })();
    }
  });

  return stateSubject;
}