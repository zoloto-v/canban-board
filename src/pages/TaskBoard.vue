<template>
  <div class="drag-container" v-drag-and-drop:options="options">
    <ul class="drag-list">
      <li class="drag-column"
        v-for="group in groups"
        :key="group.id"
      >
        <div class="drag-column__header" :class="`bg_${group.type.toLowerCase()}`">
          <h2>{{ group.text }}</h2>
        </div>
        <vue-draggable-group
          v-model="group.items"
          :groups="groups"
          :data-id="group.id"
        >
          <ul class="drag-inner-list" :data-id="group.id" :data-type="group.type">
            <li class="drag-item"
              v-for="item in group.items"
              :key="item.id"
              :data-id="item.id"
              :data-type="group.type"
              :data-text="item.name"
            >
              <div class="drag-item__text">{{ item.name }}</div>
              <Menu
                :data="{
                  id: item.id,
                  type: group.type,
                  text: item.name
                }"
                :items="items"
              />
            </li>
          </ul>
        </vue-draggable-group>
        <TaskForm
          :type="group.type"
          :addTask="addTask"
        />
      </li>
    </ul>

    <Modal
      v-if="isModalVisible"
      :onClose="onClose"
    >
      <template v-slot:header>
        <h2>Удалить задачу ?</h2>
      </template>
      <template v-slot:body>
        <span>{{ modalData?.text }}</span>
      </template>
      <template v-slot:footer>
        <TransparentButton text="Удалить"
          classes="button_transparent"
          :styles="{flexGrow: 1}"
          :onClick="removeTask"
        />
        <TransparentButton text="Отменить"
          classes="button_transparent"
          :styles="{flexGrow: 1}"
          :onClick="onClose"
        />
      </template>
    </Modal>

    <Notify />
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue'
import Notify from '@/components/Notify.vue'
import Menu from '@/components/Menu.vue'
import TransparentButton from '@/components/TransparentButton.vue'
import { NOTIFY_STATUSES } from '@/constants'
import Modal from '@/components/Modal.vue'

export default {
  name: 'TaskBoard',
  data () {
    const self = this

    return {
      isAddFormVisible: false,
      isModalVisible: false,
      modalData: null,
      opened: '',
      groups: [
        {
          id: 1,
          type: 'IN_APPROVE',
          text: 'На согласовании',
          items: [
            { id: 1, name: 'Задача 1' },
            { id: 2, name: 'Задача 2' },
            { id: 3, name: 'Задача 3' }
          ]
        },
        {
          id: 2,
          type: 'NEW',
          text: 'Новые',
          items: [
            { id: 4, name: 'Задача 4' },
            { id: 5, name: 'С другой стороны постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки направлений прогрессивного развития. Идейные соображения высшего порядка, а также сложившаяся структура организации позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. Товарищи! укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании форм развития.' },
            { id: 6, name: 'Задача 6' }
          ]
        },
        {
          id: 3,
          type: 'IN_PROGRESS',
          text: 'В процессе',
          items: []
        },
        {
          id: 4,
          type: 'DONE',
          text: 'Готово',
          items: [
            { id: 10, name: 'Задача 10' },
            { id: 11, name: 'Задача 11' },
            { id: 12, name: 'Задача 12' },
            { id: 13, name: 'Задача 13' }
          ]
        },
        {
          id: 5,
          type: 'REOPENED',
          text: 'Доработать',
          items: [
            { id: 14, name: 'Задача 14' },
            { id: 15, name: 'Задача 15' },
            { id: 16, name: 'Задача 16' },
            { id: 17, name: 'Задача 17' }
          ]
        }
      ],
      options: {
        dropzoneSelector: '.drag-inner-list',
        draggableSelector: '.drag-item',
        onDrop: function (value) {
          console.log('onDrop')

          const { type = '' } = value?.droptarget?.dataset
          const { text = '' } = value?.items.length && value?.items[0]?.dataset

          this.$notify({
            group: 'custom-template',
            title: `Задача перенесена в "${NOTIFY_STATUSES.get(type)}"`,
            text
          })
        }
      },
      items: [
        {
          icon: 'fa-solid fa-edit',
          text: 'Редактировать',
          action: (data) => console.log(data)
        },
        {
          icon: 'fa-solid fa-trash',
          text: 'Удалить',
          action: (data) => {
            self.showModal(data)
          }
        }
      ]
    }
  },
  methods: {
    openCreateTaskForm (e) {
      this.isAddFormVisible = true
    },
    closeCreateTaskForm (e) {
      this.isAddFormVisible = false
    },
    addTask (e) {
      const index = this.groups.findIndex(g => g.type === e.type)

      if (index > -1) {
        const obj = Object.assign({}, this.groups[index])

        obj.items.push({
          id: Date.now(),
          name: e.text
        })

        this.groups = [...this.groups.slice(0, index), obj, ...this.groups.slice(index + 1)]

        this.$notify({
          group: 'custom-template',
          title: `Задача создана в "${obj.text}"`,
          text: e.text
        })
      }
    },
    removeTask (e) {
      const index = this.groups.findIndex(g => g.type === this.modalData.type)

      if (index > -1) {
        const obj = Object.assign({}, this.groups[index])

        obj.items = obj.items.filter(i => i.id !== this.modalData.id)
        this.groups = [...this.groups.slice(0, index), obj, ...this.groups.slice(index + 1)]
        this.$notify({
          group: 'custom-template',
          title: 'Задача удалена',
          text: this.modalData.text
        })

        this.onClose()
      }
    },
    showModal (payload) {
      this.isModalVisible = true
      this.modalData = payload
    },
    onClose () {
      this.isModalVisible = false
      this.modalData = null
    }
  },
  components: {
    TaskForm,
    Notify,
    Menu,
    Modal,
    TransparentButton
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.bg_in_approve {
  background: #FF99E9;
}
.bg_new {
  background: #66B8FF;
}
.bg_in_progress {
  background: #FFD466;
}
.bg_done {
  background: #53C666;
}
.bg_reopened {
  background: #F76E85;
}

body {
  background: #33363d;
  color: white;
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  max-width: 1000px;
  margin: 0 auto;
}
.drag-list {
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;

  @media (max-width: 690px) {
    display: block;
  }
}
.drag-column {
  flex: 1 1 250px;
  margin: 0 10px;
  background: #f7f7f7;
  overflow: hidden;
  border-radius: 10px;

  h2 {
    width: 100%;
    margin: 0;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
  }

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }
}
.drag-column__header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px ;
  position: relative;
  user-select: none;
}
.drag-column__more {
  position: absolute;
  top: 10px;
  right: 10px;
}
.drag-inner-list {
  overflow: auto;
}
.drag-item {
  display: flex;
  align-items: start;
  position: relative;
  margin: 10px;
  padding: 5px;
  height: auto;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #c4cad4;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.drag-item[aria-grabbed="true"] {
  box-shadow: 0px 8px 8px 0px #00000014;
}
.drag-item__text {
  flex: 1 1 auto;
  font-size: 14px;
  word-break: break-word;
}
.drag-header-more {
  cursor: pointer;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 6rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
