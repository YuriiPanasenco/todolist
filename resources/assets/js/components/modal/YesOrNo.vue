<template>
	<div class="modal-container">
        <div class="modal-body">
            <slot> </slot>
        </div>

        <div class="modal-footer">
            <slot name="footer">
                <button class="yes" @click="$emit('yes')">
                 	Yes
                </button>
                <button class="no" @click="$emit('no')">
                 	No
                </button>
            </slot>
          </div>
        </div>
</template>
<script>
	export default{

	}
</script>
<style scoped>

.modal-body {
  margin: 20px 0;
}

button {
    border: none;
    color: white;
    height: 30px;
    font-size: 1.1em;
    border-radius: 3px;
    margin:3px;
}
button:hover{
    box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
    transform:scaleY(1.1);
    transform:scaleX(1.05);
    transition: 0.2s;
}
.yes{
	background-color: #3fb338f5;
}
.no{
	background-color:#dc472df5;
}

</style>