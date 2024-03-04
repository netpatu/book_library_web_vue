<script>
import { reactive, ref } from 'vue'
import { TABLE_DATA } from '@/utils/constant'
import dialogModel from './addBookModal.vue'
import editdialogModel from './editBookModal.vue'
import detaildialogModel from './bookDetailModal.vue'

const loginForm = {
  username: '',
  password: '',
}

const bankID = {id: ''}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    dialogModel,
    editdialogModel,
    detaildialogModel
  },
  setup() {
    let formDataBook = reactive(bankID)
    // let tableData = reactive(TABLE_DATA)
    let refBookDialog = ref()
    let refBookEditDialog = ref()
    let refBookDetailDialog = ref()

    let handleOpen = () => {
      refBookDialog.value.show()
    }
    
    let load = (tree, treeNode, resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            author: 'Little tiger Wang',
            publicyear: '2000',
            isbn: 'ISBN 978-1-79947-454-1'
          },
          {
            id: 32,
            date: '2016-05-01',
            author: 'Little tiger Wang',
            publicyear: '2001',
            isbn: 'ISBN 978-1-79947-454-2'
          }
        ])
      }, 1000)
    }

    let detailAction = row => {
      console.log(row)
      refBookDetailDialog.value.show(row)
    }

    let updateRowAction = row => {
      console.log(row)
      refBookEditDialog.value.show(row)
    }

    let deleteRowAction = row => {
      console.log(row)
      console.log(title)
    }

    return {
      formDataBook,
      // tableData,
      refBookDialog,
      refBookEditDialog,
      refBookDetailDialog,
      handleOpen,
      load,
      detailAction,
      updateRowAction,
      deleteRowAction
    }
  },  
  mounted () {

    let api2 = `/books`
    // let url2 = "/bookApi" + api2
    let url2 = api2
    this.axios.get(url2).then((response)=>{
        console.log(response.data.data)
        let tableDataTemp = []
        var lenght = response.data.data.length
        console.log(lenght)
        for(var i = 0;i<lenght;i++){
          var item = response.data.data[i]
          console.log(item)
          tableDataTemp[i] = {
            id: item.bookId,
            title: item.bookTitle,
            author: item.author,
            publicyear: item.publicationDate,
            isbn: item.isbn,
          }
        }

        this.tableData = tableDataTemp
        // console.log(this.tableData)
    })

    // // 请求拦截
    // this.axios.interceptors.request.use((config)=>{
    //     alert("请求将要开始")
    //     // console.log("请求将要开始")
    //     return config
    // },(error)=>{
    //     // alert("请求出现错误")
    //     console.log("请求出现错误")
    //     return Promise.reject(error)
    // })

    // 统一配置URL前缀，超时时间和自定的header
    // const instance =this. axios.create({
    //     baseURL: '/myApi',
    //     timeout: 1000,
    //     headers: {'X-Custom-Header': 'custom'}
    // });
    // let api2 = `/simpleWeather/query?city=${city}&key=cffe158caf3fe63aa2959767a503bbfe`
    // instance.get(api2).then((response)=>{
    //     console.log(response.data)
    // })
  },
  data() {
    let tableData = [
      {id: 1,
    title: 'Tiger January',
    author: 'Little tiger Wang',
    publicyear: '2000',
    isbn: 'ISBN 978-1-79947-454-1'}
    ]
    return{
      tableData
    }

    // let tableData = {  id: 1,
    // title: 'Tiger January',
    // author: 'Little tiger Wang',
    // publicyear: '2000',
    // isbn: 'ISBN 978-1-79947-454-1'}
    // return {
    //   tableData
    // }

  },methods: {
    requestData(row) {
      console.log(row)
      // const instance =this.axios.create({
      //   baseURL: '/bookApi',
      //   timeout: 1000,
      //   headers: {'Content-Type': 'application/json'}
      // });

      const instance =this.axios.create({
        baseURL: '',
        timeout: 1000,
        headers: {'Content-Type': 'application/json'}
      });

      let api2 = `/deletebook`
      instance.post(api2,{
       bookId: row.id,
       bookTitle: row.title,
       author: row.author,
       publicationDate: row.publicyear,
       isbn: row.isbn,
    }).then((response)=>{
        console.log(response.data)
    })
    }, searchData() {
      console.log(this.formDataBook.id)
      let api2 = `/books/${this.formDataBook.id}`
      // let url2 = "/bookApi" + api2
      let url2 = api2
      this.axios.get(url2).then((response)=>{
        console.log(response.data.data)
        let tableDataTemp = []
        // var lenght = response.data.data.length
        // console.log(lenght)
        // for(var i = 0;i<lenght;i++){
          var item = response.data.data
          console.log(item)
          tableDataTemp[0] = {
            id: item.bookId,
            title: item.bookTitle,
            author: item.author,
            publicyear: item.publicationDate,
            isbn: item.isbn,
          }
        // }

        this.tableData = tableDataTemp
    })
    }
  }
}
</script>

<template>
  <div class="config-auth">
  
    <div class="action-zone">
      <h1>{{ msg }}</h1>

      <el-button type="primary" size="mini" @click="handleOpen">Add</el-button>

      <el-input v-model="formDataBook.id" clearable style="width: 200px;padding: 10px;"></el-input>

      <el-button type="success" size="mini" @click="searchData">Search</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="Book ID" width="150"></el-table-column>
      <el-table-column prop="title" label="Book Title" width="150"></el-table-column>
      <el-table-column prop="author" label="Author" width="150"> </el-table-column>
      <el-table-column prop="publicyear" label="Public Year" width="150"> </el-table-column>
      <el-table-column prop="isbn" label="ISBN" width="150"> </el-table-column>
      <!-- <el-table-column prop="createTime" label="create date"> </el-table-column> -->
      <el-table-column label="action" width="230" align="center">
        <template #default="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            class="edit-icon"
            @click="detailAction(scope.row)"
            >Detail</el-button>
          <el-button
            type="text"
            icon="el-icon-edit"
            class="edit-icon"
            @click="updateRowAction(scope.row)"
            >Eidt</el-button>
          <el-button
            type="text"
            class="delete-icon"
            icon="el-icon-delete"
            @click="requestData(scope.row)"
            >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialogModel ref="refBookDialog" />
    <editdialogModel ref="refBookEditDialog" />
    <detaildialogModel ref="refBookDetailDialog" />
  </div>
</template>



<!-- <style lang="less"> -->
<style scoped>
.config-auth {
  margin: 15px;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
  padding: 15px;
  .edit-icon {
    color: @primary;
  }.search-icon {
    color: green;
  }
  .delete-icon {
    color: @warning;
  }
  .action-zone {
    margin-bottom: 15px;
  }
}
</style>

