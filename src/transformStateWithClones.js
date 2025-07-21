'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let tempState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        tempState = addProperties(tempState, action.extraData);
        break;

      case 'removeProperties':
        tempState = removeProperties(tempState, action.keysToRemove);
        break;

      case 'clear':
        tempState = clearProperties();
        break;

      default:
        break;
    }
    stateHistory.push({ ...tempState });
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  return Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearProperties() {
  return {};
}

module.exports = transformStateWithClones;
