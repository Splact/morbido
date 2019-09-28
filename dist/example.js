(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var defaultOptions = {
    watchAttributes: true,
    watchChildList: true,
    watchSubtree: true
  };

  var Morbido =
  /*#__PURE__*/
  function () {
    function Morbido(el, options) {
      _classCallCheck(this, Morbido);

      this._target = el;
      this._options = _objectSpread({}, defaultOptions, {}, options);
      this._isWatching = false; // wrap target

      this._wrapper = this._buildWrapper();

      this._target.parentNode.insertBefore(this._wrapper, this._target);

      this._wrapper.appendChild(this._target);
    } // Private Methods


    _createClass(Morbido, [{
      key: "_buildWrapper",
      value: function _buildWrapper() {
        var div = document.createElement('div');
        div.classList.add('morbido');
        return div;
      } // Public Methods

    }, {
      key: "watch",
      value: function watch(count) {
        if (this._isWatching) {
          return false;
        }

        this._watchingCount = count;
        this._isWatching = true;
        return true;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (!this._isWatching) {
          return false;
        }

        this._isWatching = false;
        return true;
      }
    }]);

    return Morbido;
  }();

  var changeButton = document.getElementById('change-button');
  var morbidoTarget = document.getElementById('morbido-target');
  var changingParagraph = document.getElementById('changing-paragraph');
  var morbido = new Morbido(morbidoTarget);
  var DUMMY_PARAGRAPH = 'Forte, frittata tortellini paparazzi caprese, forte, cupola zucchini\
pronto tombola caprese salami. Spaghetti confetti ballerina cannelloni\
tortellini spaghetti espresso, ciao panini pepperoni ballerina\
zucchini gnocchi pepperoni, barista gnocchi mamma salami frittata\
pepperoni.';
  changeButton.addEventListener('click', function () {
    var pCount = 1 + Math.round(Math.random() * 2);
    var p = '';

    while (pCount-- > 0) {
      p += DUMMY_PARAGRAPH;
    }

    changingParagraph.innerText = p;
  });

}));
//# sourceMappingURL=example.js.map
