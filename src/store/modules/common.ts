interface State {
  loadingShow: boolean
}

const common = {
  state: {
    loadingShow: false, // 界面加载中的提示
  },
  mutations: {
    SET_loadingShow: (state: State, loadingShow: boolean) => {
      state.loadingShow = loadingShow
    }
  },
  actions: { // 异步方法调用
    // 切换显示状态
    loadingShow(context: any, loadingShow: boolean) {
      context.commit('SET_loadingShow', loadingShow)
    }
  }
}

export default common
