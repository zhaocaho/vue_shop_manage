<template>
  <div class="login">
    <div class="login_container">
      <!-- log区 -->
      <div class="login_log">
        <img src="@/assets/logo.png" alt="log" />
      </div>
      <!-- 表单区 -->
      <el-form
        ref="loginForm"
        class="login_form"
        label-width="0px"
        :model="loginForm"
        :rules="rules"
      >
        <!-- 用户名 -->
        <el-form-item class="login_userName" prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="login_userPassword" prop="password">
          <el-input
            prefix-icon="iconfont icon-lockicon"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 提交重置区 -->
        <el-form-item class="login_button">
          <el-button type="primary" round @click="submitForm">登录</el-button>
          <el-button type="info" round @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // 用户名称的验证
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          // 密码的验证
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(loginForm) {
      // 提交之前进行验证
      this.$refs.loginForm.validate(valid => {
        // 这里的valid表示验证成功后的结果，如果为真就submit
        if (valid) {
          //验证成功后发起ajax请求
          this.$http.post('login', this.loginForm).then(result => {
            if (result.data.meta.status === 200) {
              //将获取到的token值保存到当前会话窗口
              window.sessionStorage.setItem('token', result.data.data.token)
              this.$router.push('/home')
            } else {
              this.$alert('The user or password in error', 'error', {
                confirmButtonText: '确定',
                callback: action => {}
              })
              //输入错误后input按钮自动清空
              //   this.loginForm.username = this.loginForm.password = ''
              this.resetForm(loginForm)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(loginForm) {
      // 重置所有内容
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background-color: #264a6b;
  .login_container {
    height: 365px;
    width: 550px;
    background-color: aliceblue;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px gray;
    .login_log {
      height: 150px;
      width: 150px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      position: absolute;
      padding: 10px;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #eeeeee;
      box-sizing: border-box;
      box-shadow: 0 0 10px #eeeeee;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .login_form {
      padding: 50px 100px;
      margin-top: 50px;
      .login_button {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
