const defaultOptions = {
  watchAttributes: true,
  watchChildList: true,
  watchSubtree: true,
};

export default class Morbido {
  constructor(el, options) {
    this._target = el;
    this._options = { ...defaultOptions, ...options };
    this._isWatching = false;

    // wrap target
    this._wrapper = this._buildWrapper();
    this._target.parentNode.insertBefore(this._wrapper, this._target);
    this._wrapper.appendChild(this._target);
  }

  // Private Methods
  _buildWrapper() {
    const div = document.createElement('div');
    div.classList.add('morbido');
    return div;
  }

  // Public Methods
  watch(count) {
    if (this._isWatching) {
      return false;
    }

    this._watchingCount = count;
    this._isWatching = true;

    return true;
  }

  stop() {
    if (!this._isWatching) {
      return false;
    }

    this._isWatching = false;

    return true;
  }
}
