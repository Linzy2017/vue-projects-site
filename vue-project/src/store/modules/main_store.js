/**
 * Created by LQZ on 2017/8/10.
 */
import * as types from '../mutation-types'

// initial state
const state = {
  page_index: 0
}
// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.PAGE_INDEX] (state, mes) {
    state.page_index = mes
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
