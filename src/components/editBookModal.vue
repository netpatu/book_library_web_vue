<template>
  <el-dialog
    title="Edit Book"
    v-model="visible"
    width="700px"
    :before-close="handleClose"
  >
    <el-form :model="formData" label-width="auto">
      <el-form-item
        prop="bookTitle"
        label="BookTitle"
        :rules="[
          { required: true, message: 'pls input book title', trigger: 'blur' }
        ]"
      >
      <el-input v-model="formData.bookTitle"></el-input>
      </el-form-item>
      <el-form-item
        prop="author"
        label="Author"
        :rules="[
          { required: true, message: 'pls input book author', trigger: 'blur' }
        ]"
      >
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item
        prop="publicYear"
        label="PublicYear"
        :rules="[
          { required: true, message: 'pls input public year', trigger: 'blur' }
        ]"
      >
        <el-input v-model="formData.publicYear"></el-input>
      </el-form-item>
      <el-form-item
        prop="bookISBN"
        label="BookISBN"
        :rules="[
          { required: true, message: 'pls input book isbn', trigger: 'blur' }
        ]"
      >
        <el-input v-model="formData.bookISBN"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" size="mini">Cancel</el-button>
        <el-button type="primary" @click="requestData" size="mini"
          >OK</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
const pureFormData = {
  bookID: '',
  bookTitle: '',
  author: '',
  publicYear: '',
  bookISBN: ''
}
export default {
  emits: ['handleOpen'],
  setup() {
    let visible = ref(false)
    let formData = reactive(pureFormData)

    let handleClose = () => {
      visible.value = false
    }

    let handleSure = () => {
      visible.value = true
    }

    let show = params => {
      visible.value = true
      console.log(params)
      formData.bookID =params['id']
      formData.bookTitle =params['title']
      formData.author =params['author']
      formData.publicYear =params['publicyear']
      formData.bookISBN =params['isbn']
    }

    return {
      formData,
      handleClose,
      handleSure,
      visible,
      show
    }
  },methods: {
    requestData() {
      this.visible = false

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

      let api2 = `/updatebook`
      instance.post(api2,{
       bookId: this.formData.bookID,
       bookTitle: this.formData.bookTitle,
       author: this.formData.author,
       publicationDate: this.formData.publicYear,
       isbn: this.formData.bookISBN
    }).then((response)=>{
        console.log(response.data)
    })
    }
  }
}
</script>
