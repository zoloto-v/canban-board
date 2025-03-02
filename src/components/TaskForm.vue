<template>
  <div style="marginTop: 10px">
    <form v-show="isVisible" method="post" @submit.prevent="onSubmit" class="task-form" ref="formRef">
      <textarea
        name="task"
        class="task-form__textarea"
        id="text"
        placeholder="Введите текст ..."
        ref="text"
      ></textarea>
      <div class="task-form__controls">
        <TransparentButton text="" :onClick="closeCreateTaskForm">
          <template v-slot:icon>
            <FontAwesomeIcon icon="fa-solid fa-close" style="color: #F53D5C; font-size: 10px;"/>&nbsp;
          </template>
        </TransparentButton>
        <TransparentButton text="" :onClick="saveTask">
          <template v-slot:icon>
            <FontAwesomeIcon icon="fa-solid fa-check" style="color: #22C33D; font-size: 10px;"/>&nbsp;
          </template>
        </TransparentButton>
      </div>
    </form>
    <div v-show="!isVisible" style="{display: flex, flexDirection: row, alignItems: center}">
      <TransparentButton text="Добавить" :onClick="openCreateTaskForm" style="color: #66B8FF; margin-bottom: 10px">
        <template v-slot:icon>
          <FontAwesomeIcon icon="fa-solid fa-plus" style="color: #66B8FF;"/>&nbsp;
        </template>
      </TransparentButton>
    </div>
  </div>
</template>

<script>
import TransparentButton from '@/components/TransparentButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  name: 'TaskForm',
  props: ['type', 'addTask'],
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    openCreateTaskForm: function (e) {
      this.isVisible = true
      console.log(this)
    },
    saveTask: function () {},
    onSubmit: function () {
      try {
        const formData = new FormData(this.$refs.formRef)
        const searchText = formData.get('task')

        this.$props.addTask({
          type: this.$props.type,
          text: searchText
        })
      } catch (err) {
        console.error(err)
      }
    },
    closeCreateTaskForm: function (e) {
      this.isVisible = false
    }
  },
  components: {
    TransparentButton,
    FontAwesomeIcon
  }
}
</script>

<style scoped>
.task-form {
  display: flex;
  align-items: center;
  margin: 10px;
  position: relative;
}
.task-form__textarea {
  width: 100%;
  position: relative;
  line-height: 2;
  padding: 8px;
  padding-right: 30px;
  border-radius: 5px;
}
.task-form__controls {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>
