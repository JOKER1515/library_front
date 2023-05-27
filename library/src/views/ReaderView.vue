<template>
    <div id="adminBack">
        <el-container style="height: 745px; border: 1px solid #eee">
            <el-header style="text-align: left">
                <span style="font-size: 25px;">图书管理系统</span>
                <div style="display: inline-block; position: relative; left: 1150px; font-size: 20px;">welcome, {{ id }}
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1', '3']">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-menu"></i>用户操作</template>
                            <el-menu-item index="1-1">
                                <div style="text-decoration: none;">所有图书</div>
                            </el-menu-item>
                            <el-menu-item index="1-2">已借图书</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="e-l-icon-setting"></i>账户设置</template>
                            <el-menu-item index="2-1">修改密码</el-menu-item>
                            <el-menu-item index="2-2">登出</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-table :data="tableData" style="width: 1000px" id="table1">
                        <el-table-column prop="bookName" label="书名" width="200">
                        </el-table-column>
                        <el-table-column prop="author" label="作者" width="200">
                        </el-table-column>
                        <el-table-column prop="state" label="是否可借" width="200">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <!-- <button id="btn" @click="borrow">借阅</button> -->
                            <template slot-scope="scope">
                                <el-button type="text" @click="borrow(scope.row)">借阅</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button type="text" @click="returnBook(scope.row)">归还</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :total="50" style="position: absolute; left: 36%;">
                    </el-pagination>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios';
var id = window.sessionStorage.getItem('id');

function getInfo(readerId, bookId, bookName) {
    this.readerId = readerId;
    this.bookId = bookId;
    this.bookName = bookName;
}
export default {
    data() {
        return {
            tableData: [],
            id
        }
    },
    methods: {
        borrow: function (val) {
            var info = new getInfo(id, 0, val.bookName);
            axios.post("http://localhost:8080/reader/borrow", info)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })
        },
        returnBook: function (val) {
            var info = new getInfo(id, 0, val.bookName);
            axios.post("http://localhost:8080/reader/return", info)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })
        },
    },
    mounted() {
        axios.get("http://localhost:8080/reader")
            .then(res => {
                this.tableData = res.data.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
};
</script>

<style>
* {
    margin: 0%;
    padding: 0%;
}

#adminBack {

    background-image: url("../assets/log.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;

}

.el-header {
    background-color: #8c929d76;
    color: #ffffff;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

#btn {
    width: 50px;
    height: 30px;
    background-color: #80c9e9fc;
    border: 2px;
    color: white;
}

#table1 {
    position: relative;
    left: 2%;
}

#btnMenu {
    text-decoration: none;
}
</style>