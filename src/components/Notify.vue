<template>
  <notifications
    group="custom-template"
    :width="300"
    :duration=40000
    position="bottom right"
  >
    <template slot="body" slot-scope="props">
      <div class="wrapper">
      <div class="notification">
        <div class="notification__icon">
          <FontAwesomeIcon icon="fa-solid fa-check" style="color: #fff" />
        </div>
        <div class="notification__content">
          <h4 class="notification__title">
            {{ props.item.title }}
          </h4>
          <span class="notification__text" v-html="props.item.text"></span>
        </div>
        <div class="notification__close"
          @click="props.close">
          <FontAwesomeIcon icon="fa-solid fa-close" style="color: #000000" />
        </div>
      </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  name: 'Notify',
  data () {
    return {}
  }
}
</script>

<style>
.wrapper {
  margin: 0 5px 5px 0;
}
.notification {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 5px 30px 5px 5px;
  border-radius: 3px;
  border-left: 7px solid #53C666;
  background: #fff;
}
.notification__icon {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  margin-left: 5px;
  margin-right: 10px;
  background: #53C666;
  border-radius: 10px;
}
.notification__title,
.notification__text {
  font-size: 14px;
}
.notification__title {
  margin: 0;
  margin-bottom: 8px;
  font-weight: bold;
}
.notification__close {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
