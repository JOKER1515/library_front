<template>
    <div id="adminBack">
        <el-container style="height: 745px; border: 1px solid #eee">

            <!-- 页面头部 -->
            <el-header style="text-align: left">
                <span style="font-size: 25px;">图书管理系统</span>
                <div style="display: inline-block; position: relative; left: 1150px; font-size: 20px;">欢迎, {{ id }}
                </div>
            </el-header>
            <el-container>

                <!-- 侧边栏 -->
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1', '3']">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-menu"></i>用户操作</template>
                            <el-menu-item index="1-1">
                                <div style="text-decoration: none;" @click="allBooks">所有图书</div>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <div style="text-decoration: none;" @click="booksBorrowed">已借图书</div>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="e-l-icon-setting"></i>账户设置</template>
                            <el-menu-item index="2-1">修改密码</el-menu-item>
                            <el-menu-item index="2-2">
                                <el-button type="text" @click="logOut">登出</el-button>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <!-- 页面body -->
                <el-main>
                    <span style="font-size: 18px; color: #514a4a; position: relative; left: 50px;">查找图书</span>
                    <el-input v-model="input" placeholder="请输入书名或作者名字"
                        style="position: relative; width: 245px; left: 70px;"></el-input>
                    <el-button type="primary" round style="position: relative; left: 80px;" @click="search">查询</el-button>
                    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                        style="width: 1200px; position: relative; top: 15px; left: 15px;">
                        <el-table-column prop="bookName" label="书名" width="300px">
                        </el-table-column>
                        <el-table-column prop="author" label="作者" width="300px">
                        </el-table-column>
                        <el-table-column prop="stateMessage" label="是否可借" width="300px">
                        </el-table-column>
                        <el-table-column label="操作" width="300px">
                            <!-- <button id="btn" @click="borrow">借阅</button> -->
                            <template slot-scope="scope">
                                <el-button type="primary" @click="borrow(scope.row)">借阅</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 分页 -->
                    <!-- <el-pagination background layout="prev, pager, next" :total="50"
                        style="position: relative;top: 25px; left: 400px; width: 200px;">
                    </el-pagination> -->
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                        :total=36 style="position: relative; top: 25px; left: 200px; width: 400px;">
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

//获取书本对象
/* public class Book {
    private Integer id;
    private String bookName;
    private String author;
    private Integer state;
    private String stateMessage;
    private LocalDate borrowTime;
    private LocalDate lastReturnTime;
} */

function getBook(id, bookName, author, state, stateMessage, borrowTime, lastReturnTime) {
    this.id = id;
    this.bookName = bookName;
    this.author = author;
    this.state = state;
    this.stateMessage = stateMessage;
    this.borrowTime = borrowTime;
    this.lastReturnTime = lastReturnTime;
}

export default {
    data() {
        return {
            tableData: [],
            id,
            input: '',
            currentPage: 1,
            pageSize: 6,
            length,
        }
    },
    methods: {

        //借阅方法
        borrow: function (val) {
            //弹框设置
            this.$confirm('是否借阅该书', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //向后端发起请求
                var info = new getInfo(id, 0, val.bookName);
                axios.post("http://localhost:8080/reader/borrow", info)
                    .then(res => {
                        //console.log(res)
                        if (res.data.msg == "success") {
                            this.$message({
                                type: 'success',
                                message: '借阅成功!'
                            });
                            //计时器，一秒后刷新页面使得数据能够得到重新载入
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '请勿重复借阅相同书本!'
                            });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消借阅'
                });
            });
        },

        //查看所有可借图书
        allBooks: function () {
            window.location.reload();
            this.$router.push({
                name: 'reader'
            });
        },

        //查看该用户已经借走的图书
        booksBorrowed: function () {
            // window.location.reload();
            this.$router.push({
                name: 'borrowed'
            })
        },

        //登出触发函数
        logOut: function () {
            this.$confirm('是否要登出该账户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({
                    name: 'log',
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消登出'
                });
            });
        },

        //查询方法
        search: function () {
            axios.put("http://localhost:8080/reader/searchByInfo", new getBook(0, this.input, this.input, 0, "", "", ""))
                .then(res => {
                    this.tableData = res.data.data;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;

        },
    },

    //钩子函数
    mounted() {
        axios.get("http://localhost:8080/reader/allBooks")
            .then(res => {
                this.tableData = res.data.data;
                var length = this.tableData.length;
                console.log(length);
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