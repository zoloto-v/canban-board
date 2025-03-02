<template>
  <div>
    <form v-show="isVisible" method="post" @submit.prevent="onSubmit" class="task-form" ref="formRef">
      <textarea
        name="task"
        class="task-form__textarea"
        id="text"
        placeholder="Введите текст..."
        ref="text"
        autfocus
      ></textarea>
      <div class="task-form__controls">
        <TransparentButton text="" :onClick="closeForm">
          <template v-slot:icon>
            <FontAwesomeIcon icon="fa-solid fa-close" style="color: #F53D5C; font-size: 14px;"/>&nbsp;
          </template>
        </TransparentButton>
        <TransparentButton type="submit" text="" :onClick="saveTask">
          <template v-slot:icon>
            <FontAwesomeIcon icon="fa-solid fa-check" style="color: #22C33D; font-size: 14px;"/>&nbsp;
          </template>
        </TransparentButton>
      </div>
    </form>
    <div v-show="!isVisible" style="display: flex; flex-direction: row; align-items: center;">
      <TransparentButton text="Добавить" :onClick="openForm" style="color: #66B8FF; margin: 5px 0;">
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
    openForm: function (e) {
      this.isVisible = true
      setTimeout(() => {
        this.$refs.text.blur()
        this.$refs.text.focus()
      })
    },
    closeForm: function (e) {
      this.clearForm()
      this.isVisible = false
    },
    clearForm: function () {
      this.$refs.text.value = ''
    },
    saveTask: function () {},
    onSubmit: function () {
      try {
        const formData = new FormData(this.$refs.formRef)
        const text = formData.get('task')

        if (text) {
          this.$props.addTask({
            type: this.$props.type,
            text
          })

          this.closeForm()
        }
      } catch (err) {
        console.error(err)
      }
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
.task-form__textarea:active,
.task-form__textarea:focus,
.task-form__textarea:focus-visible {
  outline: none;
  border: 1px solid #66B8FF;
}
.task-form__controls {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>
