import delay from './utils/delay';
import tick from './utils/tick';

const defaultOptions = {
  watchAttributes: true,
  watchCharacterData: true,
  watchChildList: true,
  watchSubtree: true,
  timeout: {
    enter: 0,
    mutation: 0,
    exit: 0,
  },
  onExit: f => f,
  onMutation: f => f,
  onEnter: f => f,
};

export default class Morbido {
  constructor(el, { timeout, ...options }) {
    this._options = { ...defaultOptions, ...options };
    this._options.timeout = this._parseTimeouts(timeout || 0);

    this._target = el;
    this._wrapper = this._target.parentNode;

    this._saveCurrentState();

    this._isWatching = false;
    this._mutationObserver = new MutationObserver(this._handleMutation);
    this._isMutating = false;
  }

  // Private Methods
  _parseTimeouts(timeout) {
    let exit, mutation, enter;

    exit = mutation = enter = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      mutation = timeout.mutation !== undefined ? timeout.mutation : exit;
      enter = timeout.enter !== undefined ? timeout.enter : exit;
    }
    return { exit, mutation, enter };
  }
  _getObserverOptions() {
    return {
      attributes: this._options.watchAttributes,
      attributeOldValue: this._options.watchAttributes,
      characterData: this._options.watchCharacterData,
      characterDataOldValue: this._options.watchCharacterData,
      childList: this._options.watchChildList,
      subtree: this._options.watchSubtree,
    };
  }
  _saveCurrentState() {
    this._storedTarget = this._target.cloneNode(true);
    this._storedSize = {
      width: this._target.offsetWidth,
      height: this._target.offsetHeight,
    };
  }

  async _mutate() {
    if (this._isMutating) {
      return false;
    }

    this._isMutating = true;
    this._wrapper = this._target.parentNode;

    this._mutation = {
      width: {
        from: this._storedSize.width,
        to: this._target.offsetWidth,
      },
      height: {
        from: this._storedSize.height,
        to: this._target.offsetHeight,
      },
    };

    const storedTargetInlineTransition = this._storedTarget.style.transition;

    // set size and no-transition inline to previous state element before attaching to dom
    this._storedTarget.style.height = `${this._mutation.height.from}px`;
    this._storedTarget.style.width = `${this._mutation.width.from}px`;
    this._storedTarget.style.transition = `none`;

    // replace the target with stored state (previous state) element
    this._wrapper.replaceChild(this._storedTarget, this._target);

    // keep transition disabled for a tick
    await tick();
    // then restore it
    this._storedTarget.style.transition = storedTargetInlineTransition;

    // wait for exit to happen
    await Promise.all([
      this._options.onExit({
        mutation: this._mutation,
        exitingElement: this._storedTarget,
        enteringElement: this._target,
      }),
      delay(this._options.timeout.exit),
    ]);

    // set new size inline to stored target (attached to dom)
    this._storedTarget.style.height = `${this._mutation.height.to}px`;
    this._storedTarget.style.width = `${this._mutation.width.to}px`;

    // wait for mutation to happen
    await Promise.all([
      this._options.onMutation({
        mutation: this._mutation,
        exitingElement: this._storedTarget,
        enteringElement: this._target,
      }),
      delay(this._options.timeout.mutation),
    ]);

    // replace the stored state (previous state) with target
    this._wrapper.replaceChild(this._target, this._storedTarget);

    await tick();

    // wait for enter to happen
    await Promise.all([
      this._options.onEnter({
        mutation: this._mutation,
        exitingElement: this._storedTarget,
        enteringElement: this._target,
      }),
      delay(this._options.timeout.enter),
    ]);

    this._saveCurrentState();
    this._isMutating = false;
  }

  _handleMutation = async () => {
    this._mutationObserver.disconnect();

    await this._mutate();

    this._mutationObserver.observe(this._target, this._getObserverOptions());
  };

  // Public Methods
  watch() {
    if (this._isWatching) {
      return false;
    }

    this._isWatching = true;

    this._saveCurrentState();

    // Start observing the target node for configured mutations
    this._mutationObserver.observe(this._target, this._getObserverOptions());

    return true;
  }

  stop() {
    if (!this._isWatching) {
      return false;
    }

    // Stop observing
    this._mutationObserver.disconnect();

    this._isWatching = false;

    return true;
  }

  mutate() {
    if (!this._isWatching) {
      this._mutate();
    } else {
      console.warn('Warning: mutate has been called in watching mode.');
    }
  }
}
