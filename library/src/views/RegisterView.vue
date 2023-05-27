<template>
    <div id="back">
        <div id="head">图书管理系统</div>
        <div id="form">
            <el-form ref="form" :model="form" label-width="80px">
                <div id="log">注册</div>
                <div id="form-top1"></div>
                <el-form-item label="用户名" style="position: relative; left: 40px;">
                    <el-input v-model="form.id" id="input"></el-input>
                </el-form-item>
                <el-form-item label="密码" id="input2" style="position: relative; left: 40px;">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" id="input2" style="position: relative; left: 40px;">
                    <el-input v-model="form.readerName"></el-input>
                </el-form-item>
                <el-form-item label="性别" style="position: relative; left: 40px;">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item id="button1">
                    <el-button type="primary" id="btn">
                        <router-link to="/log" style="text-decoration: none; color: white;">返回</router-link>
                    </el-button>
                    <el-button type="primary" @click="onSubmit" id="btn">确认注册</el-button>
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
            }
        }
    },
    methods: {
        onSubmit: function () {
            this.$confirm('是否注册一个新账户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post("http://localhost:8080/register/common", this.form)
                    .then(res => {
                        if (res.data.msg == "success") {
                            this.$message({
                                type: 'success',
                                message: '注册成功!'
                            });
                            this.$router.push({
                                name: 'log',
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: '注册失败，已存在该用户！'
                            });
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }

}
</script>

<style>
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

#form-top1 {
    height: 30px;
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

#button1 {
    position: relative;
    left: 75px;
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