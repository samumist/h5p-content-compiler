import ToolbarButton from './toolbar-button';
import Util from '@services/util';
import './toolbar.scss';

/** Class representing the button bar */
export default class Toolbar {

  /**
   * @class
   * @param {object} [params={}] Parameters.
   * @param {object[]} [params.buttons] Button parameters.
   * @param {boolean} [params.hidden=false] If true, hide toolbar.
   * @param {object} [callbacks={}] Callbacks.
   */
  constructor(params = {}, callbacks = {}) {
    this.params = Util.extend({
      buttons: [],
      hidden: false
    }, params);

    this.callbacks = Util.extend({
    }, callbacks);

    this.buttons = {};

    // Build DOM
    this.dom = document.createElement('div');
    this.dom.classList.add('h5p-game-map-toolbar-tool-bar');
    if (this.params.hidden) {
      this.hide();
    }

    // Buttons
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('toolbar-buttons');
    this.dom.append(this.buttonsContainer);

    this.params.buttons.forEach((button) => {
      this.addButton(button);
    });
  }

  /**
   * Return the DOM for this class.
   *
   * @returns {HTMLElement} DOM for this class.
   */
  getDOM() {
    return this.dom;
  }

  /**
   * Focus whatever should get focus.
   */
  focus() {
    Object.values(this.buttons)[0]?.focus();
  }

  /**
   * Add button.
   *
   * @param {object} [button={}] Button parameters.
   */
  addButton(button = {}) {
    if (typeof button.id !== 'string') {
      return; // We need an id at least
    }

    this.buttons[button.id] = new ToolbarButton(
      {
        ...(button.a11y && { a11y: button.a11y }),
        classes: ['toolbar-button', `toolbar-button-${button.id}`],
        ...(typeof button.disabled === 'boolean' && {
          disabled: button.disabled
        }),
        ...(button.active && { active: button.active }),
        ...(button.type && { type: button.type }),
        ...(button.pulseStates && { pulseStates: button.pulseStates }),
        ...(button.pulseIndex && { pulseIndex: button.pulseIndex })
      },
      {
        ...(typeof button.onClick === 'function' && {
          onClick: (event, params) => {
            button.onClick(event, params);
          }
        })
      }
    );
    this.buttonsContainer.appendChild(this.buttons[button.id].getDOM());
  }

  /**
   * Set button attributes.
   *
   * @param {string} id Button id.
   * @param {object} attributes HTML attributes to set.
   */
  setButtonAttributes(id = '', attributes = {}) {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    for (let attribute in attributes) {
      this.buttons[id].setAttribute(attribute, attributes[attribute]);
    }
  }

  /**
   * Force button state.
   *
   * @param {string} id Button id.
   * @param {boolean|number} active If true, toggle active, else inactive.
   */
  forceButton(id = '', active) {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].force(active);
  }

  /**
   * Block button.
   *
   * @param {string} id Button id.
   */
  blockButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].block();
  }

  /**
   * Unblock button.
   *
   * @param {string} id Button id.
   */
  unblockButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].unblock();
  }

  /**
   * Enable button.
   *
   * @param {string} id Button id.
   */
  enableButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].enable();
  }

  /**
   * Disable button.
   *
   * @param {string} id Button id.
   */
  disableButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].disable();
  }

  /**
   * Show button.
   *
   * @param {string} id Button id.
   */
  showButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].show();
  }

  /**
   * Hide button.
   *
   * @param {string} id Button id.
   */
  hideButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].hide();
  }

  /**
   * Decloak button.
   *
   * @param {string} id Button id.
   */
  decloakButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].decloak();
  }

  /**
   * Cloak button.
   *
   * @param {string} id Button id.
   */
  cloakButton(id = '') {
    if (!this.buttons[id]) {
      return; // Button not available
    }

    this.buttons[id].cloak();
  }

  /**
   * Focus a button.
   *
   * @param {string} id Button id.
   */
  focusButton(id = '') {
    if (!this.buttons[id] || this.buttons[id].isCloaked()) {
      return; // Button not available
    }

    this.buttons[id].focus();
  }

  /**
   * Show.
   */
  show() {
    this.dom.classList.remove('display-none');
  }

  /**
   * Hide.
   */
  hide() {
    this.dom.classList.add('display-none');
  }
}
