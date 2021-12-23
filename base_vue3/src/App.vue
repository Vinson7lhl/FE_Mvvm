<template>
    <div id="nav">
        <el-config-provider :locale="locale">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
            <el-row>
                <el-button>Default</el-button>
                <el-button type="primary">Primary</el-button>
                <el-button type="success">Success</el-button>
                <el-button type="info">Info</el-button>
                <el-button type="warning">Warning</el-button>
                <el-button type="danger">Danger</el-button>
                <el-button>中文</el-button>
            </el-row>

            <el-row>
                <el-button :icon="Search" circle></el-button>
                <el-button type="primary" :icon="Edit" circle></el-button>
                <el-button type="success" :icon="Check" circle></el-button>
                <el-button type="info" :icon="Message" circle></el-button>
                <el-button type="warning" :icon="Star" circle></el-button>
                <el-button type="danger" :icon="Delete" circle></el-button>
            </el-row>
            <el-icon :size="20" color="#409EFC">
                <edit />
            </el-icon>
            <div>测试</div>
            <el-table :data="tableData" style="width: 100%" :loading='loading'>
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
            <router-view />
        </el-config-provider>
    </div>
</template>

<script>
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
    name: 'Home',
    components: { Edit, ElConfigProvider },
    data() {
        return {
            Search,
            Edit,
            Check,
            Message,
            Star,
            Delete,
            locale: zhCn,
            loading: true,
            tableData: [
                {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
                {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                },
            ]
        }
    },
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
// 引入基本样式
@import '@/assets/scss/reset.scss'
</style>
