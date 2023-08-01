import { defineStore } from 'pinia';
import { queryToken } from 'api';

const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    /**
     * @description: 更新用户信息，获取token
     * @param {Object} data 请求参数
     * @return {*}
     */
    async updateUserInfo(data) {
      try {
        const res = await queryToken(data);
        const { token, employeeCode, employeeId, tokenType, userId, userName } = res.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('tokenType', tokenType);
        this.userInfo = {
          userName,
          userId,
          employeeCode,
          employeeId,
        };
      } catch (err) {
        return err;
      }
    },
  },
});

export default useUserStore;
