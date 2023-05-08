<template>
    <div class="notification-field">
        <p class="text">Folder {{ folderName }}, was siged ...</p>
    </div>
</template>

<script>


export default {
name: 'NotificationField',
props: {
    folderName: {
      type: String,
      default: 'name'
    }
}
}
</script>

<style>
.notification-field{
    width: 100%;
    height: 35px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.505);
    background-blend-mode: normal;
    margin-bottom: 5%;
}
.text{
  font-family: Inter;
  font-weight: 500;
  text-align: center;
  align-items: center;
}
</style>