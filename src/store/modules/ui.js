const state = {
  lang: (navigator.language.match(/zh/) ? 'zh' : 'en')
}

const getters = {
  lang: state => state.lang
}

const mutations = {
  CHANGE_LANG (state, lang) {
    state.lang = lang
  }
}

const actions = {
  changeLanguage ({ commit }, lang) {
    commit('CHANGE_LANG', lang)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
