<template>
    <div class="notification-container">
      <transition-group name="toast-fade" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="toast.type"
        >
          <div class="toast-header">
            <i class="material-icons">{{ toast.icon }}</i>
            <span class="toast-title">{{ toast.title }}</span>
            <!-- <button class="close-button" @click="removeToast(toast.id)">
              <v-icon >mdi-close</v-icon>
            </button> -->
          </div>
          <div class="toast-content">{{ toast.content }}</div>
          <div class="progress-bar" v-if="toast.showProgressBar">
            <div class="progress" :style="{ width: toast.progress + '%' }"></div>
          </div>
        </div>
      </transition-group>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        toasts: [],
      };
    },
    methods: {
      addToast(toast) {
        toast.id = Date.now();
        toast.showProgressBar = true; // Show the progress bar
        toast.progress = 0; // Initialize progress to 0%
  
        this.toasts.push(toast);
  
        const progressInterval = 10; // Update the progress every 10ms
        const totalTime = toast.timeout || 5000; // Timeout duration
  
        const progressTimer = setInterval(() => {
          toast.progress += (progressInterval / totalTime) * 100;
          if (toast.progress >= 100) {
            clearInterval(progressTimer);
            this.removeToast(toast.id);
          }
        }, progressInterval);
      },
      removeToast(id) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
      },
    },
  };
  </script>
  
  
<style lang="css">
/* Add your custom styles for the notifications */
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 300px;
}

.toast {
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    color: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.3s ease-in-out;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
    transition: opacity 0.3s;
}

.toast-fade-enter,
.toast-fade-leave-to

/* .toast-fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}

.toast-header {
    display: flex;
    align-items: center;
}

.toast-header i.material-icons {
    margin-right: 8px;
}

.toast-title {
    font-weight: bold;
}

.close-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
}

.toast-content {
    margin-top: 8px;
}
.progress-bar {
  height: 6px;
  background-color: #ddd;
  border-radius: 4px;
  margin-top: 8px;
}

.progress {
  height: 100%;
  width: 0;
  background-color: #4caf50; /* Green color for progress */
  border-radius: 4px;
}
</style>
  