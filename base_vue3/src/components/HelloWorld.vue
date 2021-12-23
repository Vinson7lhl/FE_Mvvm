<template>
    <div class="hello">
        <el-date-picker class='dateClass' size='small' v-model="value1" type="date" placeholder="出生日期"></el-date-picker>
        <el-row :gutter="20">
            <el-col :span="6"><el-date-picker class='dateClass' size='mini' v-model="value1" type="date" placeholder="出生日期"></el-date-picker></el-col>
            <el-col :span="6"><el-date-picker class='dateClass' v-model="value1" type="date" placeholder="出生日期"></el-date-picker></el-col>
            <el-col :span="6"><el-date-picker class='dateClass' v-model="value1" type="date" placeholder="出生日期"></el-date-picker></el-col>
            <el-col :span="6"><el-date-picker class='dateClass' v-model="value1" type="date" placeholder="出生日期"></el-date-picker></el-col>
        </el-row>
        <!-- <h1>{{ msg }}</h1> -->
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    data() {
        return {
            content: ['你好', '啊——', '李银河'],
            value1:''
        }
    },
    method: {
        formatt() {
            console.log('ddd')
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
