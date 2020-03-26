import Vue from 'vue'
import { Button, Form, FormItem, Input, MessageBox, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
