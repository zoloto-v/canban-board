<template>
  <div style="position: relative">
    <TransparentButton :onClick="openDropdown" style="color: #86949e; cursor: pointer;">
      <template v-slot:icon>
        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
      </template>
    </TransparentButton>
    <ul v-show="isVisible" class="menu" :class="isVisible ? 'menu_opened' : ''">
      <li class="menu__item" v-for="item in items" :key="item.text" @click="() => item.action(data)">
        <FontAwesomeIcon :icon="item.icon" :style="{color: '#86949E'}" />&nbsp;{{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import TransparentButton from '@/components/TransparentButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Menu',
  props: ['data', 'items'],
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    openDropdown: function (id) {
      this.isVisible = !this.isVisible
    },
    closeDropdown: function () {
      this.isVisible = false
    }
  },
  components: {
    TransparentButton,
    FontAwesomeIcon
  },
  mounted () {
    const self = this

    document.addEventListener('mouseup', function (e) {
      const container = document.querySelector('.menu.menu_opened')

      if (container && !container.contains(e.target)) {
        self.isVisible = false
      }
    })
  }
}
</script>

<style>
  .menu {
    display: flex;
    flex-direction: column;
    width: 145px;
    position: absolute;
    top: 100%;
    right: 0;
    margin: 0;
    padding: 8px 0;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px #00000014;
    z-index: 1000;
  }
  .menu__item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }
  .menu__item:hover {
    background: #E1F1FF;
    transition: background 0.3s ease-out;
  }
</style>
