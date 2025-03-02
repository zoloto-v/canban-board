<template>
  <transition name="modal">
    <div class="mask">
      <div class="modal">
        <div class="modal__container">
          <div class="modal__header">
            <slot name="header"></slot>
            <div class="modal__close">
              <FontAwesomeIcon icon="fa-solid fa-xmark" @click="onClose" />
            </div>
          </div>
          <div class="modal__body">
            <slot name="body"></slot>
          </div>
          <div class="modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['onClose']
}
</script>

<style>
  .mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal {
    display: table-cell;
    vertical-align: middle;
  }
  .modal__container {
    width: 300px;
    padding: 24px 40px 40px 40px;
    margin: 0px auto;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal__body {
    font-size: 14px;
    margin: 16px 0;
  }
  .modal__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
  .modal__close {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 24px;
    width: 24px;
    font-size: 16px;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
  .modal__header h2 {
    font-size: 24px;
    margin: 0;
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal__container,
  .modal-leave-active .modal__container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
