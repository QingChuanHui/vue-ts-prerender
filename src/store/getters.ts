const getters = {
  // token: (state: any) => state.user.token, // token
  // userInfo: state => state.user.userInfo, // 登录用户信息
  // userEnforce: state => state.user.userEnforce, // 执法用户信息
  // userModule: state => state.user.userModule, // 权限
  // userRole: state => state.user.userRole, // 登录人角色列表
  // roleList: state => state.common.roleList, // 全部角色信息缓存用
  loadingShow: (state: any) => state.common.loadingShow, // 是否显示加载层
  // loginModalShow: state => state.common.loginModalShow // 登录失效时在当前页面登录
}
export default getters
