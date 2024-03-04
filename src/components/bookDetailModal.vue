<template>
  <el-dialog
    title="Book Detail"
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
      <el-text>{{formData.bookTitle}}</el-text>
      </el-form-item>
      <el-form-item
        prop="author"
        label="Author"
        :rules="[
          { required: true, message: 'pls input book author', trigger: 'blur' }
        ]"
      >
      <el-text>{{formData.author}}</el-text>
        <!-- <el-input v-model="formData.author"></el-input> -->
      </el-form-item>
      <el-form-item
        prop="publicYear"
        label="PublicYear"
        :rules="[
          { required: true, message: 'pls input public year', trigger: 'blur' }
        ]"
      >
      <el-text>{{formData.publicYear}}</el-text>
        <!-- <el-input v-model="formData.publicYear"></el-input> -->
      </el-form-item>
      <el-form-item
        prop="bookISBN"
        label="BookISBN"
        :rules="[
          { required: true, message: 'pls input book isbn', trigger: 'blur' }
        ]"
      >
      <el-text>{{formData.bookISBN}}</el-text>
        <!-- <el-input v-model="formData.bookISBN"></el-input> -->
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSure" size="mini"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
const pureFormData = {
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
  }
}
</script>
