const Mock = require("mockjs");

const userList = [
    {
        userEamin: "123456@123.com",
        password: "123456789WEasd."
    }
]

Mock.mock(/user\/add/, 'post', (options) => {
    const data = JSON.parse(options.body)
    const index = userList.findIndex(obj  => obj.userEamin === data.userEamin)
    if (index !== -1) {
        return {
            code: 400,
            msg:"邮箱已存在"
        }
    } else {
        userList.push(data)
        console.log(userList)
        return {
            code: 200,
            msg:"注册成功"
        }
    }
})

Mock.mock(/user\/login/, 'post', (options) => {
    const data = JSON.parse(options.body)
    const index = userList.findIndex(obj  => obj.userEamin === data.userEamin)
    if (index !== -1 && userList[index].password === data.password) {
        return {
            code: 200,
            msg:"登录成功"
        }
    } else {
        return {
            code: 400,
            msg:"用户邮箱或密码不对"
        }
    }
})