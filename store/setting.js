export const state = () => ({
  overlay: false,
  camera: null
})

export const mutations = {
  setOverlay(state, payload) {
    state.overlay = payload.overlay
  },
  setCamera(state, payload) {
    state.camera = payload.camera
  }
}
