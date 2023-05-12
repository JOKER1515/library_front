<template>
    <div id="back">
        <div id="head">图书管理系统</div>
        <div id="form">
            <el-form ref="form" :model="form" label-width="80px">
                <div id="log">登录</div>
                <div id="form-top"></div>
                <el-form-item label="用户名">
                    <el-input v-model="form.id" id="input"></el-input>
                </el-form-item>
                <el-form-item label="密码" id="input2">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="管理员">
                    <el-radio-group v-model="admin">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item id="button">
                    <el-button id="btn" type="primary" @click="onSubmit">
                        登录</el-button>
                    <el-button id="btn">
                        <router-link to="/register" id="text"> 注册</router-link>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="bottom"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                id: '',
                password: '',
                readerName: '',
                gender: ''
            },
            admin: ''
        }
    },
    methods: {
        onSubmit: function () {
            if (this.admin == "否") {
                axios.post("http://localhost:8080/login/common", this.form)
                    .then(res => {
                        if (res.data.msg == "success") {
                            window.sessionStorage.setItem('id', this.form.id);
                            this.$router.push({
                                name: 'reader',
                            })
                        } else {
                            alert("登录失败！请重试！")
                        }
                    })
            } else {
                axios.post("http://localhost:8080/login/admin", this.form)
                    .then(res => {
                        if (res.data.msg == "success") {
                            this.$router.push({
                                name: 'admin'
                            })
                        } else {
                            alert("登陆失败，请重试！")
                        }
                    })
            }
        }
    }

}
</script>

<style>
#text {
    text-decoration: none;
    color: white;
}

#btn {
    background-color: rgb(27, 158, 240);
}

#back {

    background-image: url("../assets/log.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;

}

#form {
    width: 500px;
    height: 400px;
    position: relative;
    left: 33%;
    margin-top: 130px;
    background-color: rgba(255, 255, 255, 0.722);
}

#form-top {
    height: 45px;
}

#log {
    height: 70px;
    background-color: #47484b82;
    font-size: 36px;
    text-align: center;
    color: azure;
}

#head {
    height: 80px;
    background-color: rgba(255, 255, 255, 0.31);
    font-size: 50px;
    text-align: center;

}

#bottom {
    height: 135px;
}

#button {
    position: relative;
    left: 80px;
}

#input {
    width: 300px;
}

#input2 {
    width: 380px;
}

* {
    margin: 0%;
    padding: 0%;
}
</style>