export const state = () => ({
  providers: [],
  provInformation: [],
})
export const mutations = {
  SET_PROVIDERS(state, payload) {
    state.providers = payload
  },
  SET_INFO(state, payload) {
    state.provInformation = payload
  },
}
export const actions = {
  async getProviders({ commit }, payload) {
    let providers = await this.$axios.$get('api/provider', {
      headers: { 'x-access-token': payload },
      progress: false,
    })
    commit('SET_PROVIDERS', providers.values)
  },
  async addProvider({ commit }, payload) {
    let provider = await this.$axios.$post(
      'api/auth/registerProvider',
      payload.provider,
      {
        headers: { 'x-access-token': payload.token },
        progress: false,
      }
    )
  },
  async editProvider({ commit }, payload) {
    let provider = await this.$axios.$put(
      `api/provider/update/${payload.provider.id}`,
      payload.provider,
      {
        headers: { 'x-access-token': payload.token },
        progress: false,
      }
    )
  },
  async editProviderP({ commit }, payload) {
    let provider = await this.$axios.$put(
      `api/provider/update/${payload.provider.userId}`,
      payload.provider,
      {
        headers: { 'x-access-token': payload.token },
        progress: false,
      }
    )
  },
  async getProviderInfo({ commit }, payload) {
    let item = await this.$axios.$get(`api/provider/${payload.userId}`, {
      headers: { 'x-access-token': payload.token },
      progress: false,
    })
    commit('SET_INFO', item.values)
  },
}
