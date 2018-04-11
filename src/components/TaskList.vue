<template>
	<div>
		<modal v-show='showDeleteModal'>
			<yes-no @yes='deleteTaskSuccess'
					@no='deleteTaskBreak'>
				Вы действиетельно хотите удали задачу: {{currenttask.name}}?
			</yes-no>
		</modal>
		<modal v-show='showEditForm'>
			<yes-no @no='editTaskBreak'
					@yes='saveTask'>
				<form>
					<div>
						<label>Namе</label>
						<input type="text" name="name" v-model='currenttask.name'>
					</div>
					<div>
						<label>Description</label>
						<input type="text" name="name" v-model='currenttask.description'>
					</div>
				</form>
			</yes-no>
		</modal>

		<div class='block'>	
			<button class='btn-add-task' @click='showEditForm=true'>add</button>
			<input class='search' type="text" placeholder="Search.." v-model='search' :class="{'search-s':isSearch}">
		</div>
		<div class='block'>				
			<ul>
				<li v-for="task in tasks ">
					{{task.name}}
					<button @click='deleteTask(task)'>delete task</button>
					<button @click='editTask(task)'>edit task</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Modal from './modal/Modal.vue'
	import ModalYN from './modal/YesOrNo.vue'

	Array.prototype.remove = function() {
		var what, a = arguments, L = a.length, ax;
		while (L && this.length) {
			what = a[--L];
			while ((ax = this.indexOf(what)) !== -1) {
				this.splice(ax, 1);
			}
		}
		return this;
	};

	var Task = function(id, name, description){
		this.id = id===undefined?-1:id;
		this.name= name;
		this.description = description;

		this.copy = function(){
			return new Task(this.id, this.name, this.description);
		}
		this.isNew = function(){
			return this.id==-1;
		}
	};

	export default{
		data(){
			return {
				showDeleteModal:false,
				showEditForm:false,
				search: '',
				currenttask:new Task(),
				tasks:[
					new Task(1,'task 1',''),
					new Task(2,'task 2',''),
					new Task(3,'task 3',''),
				],
			};
		},

	  	components:{
	  		'modal':Modal,
	  		'yes-no':ModalYN,
	  	},
	  	computed:{
	  		isSearch(){
	  			return this.search.length>0;
	  		}
	  	},
	  	methods:{
	  		saveTask(){
	  			if(this.currenttask.isNew()){
		  			this.tasks.push(this.currenttask);
		  			
		  			//todo: add to server and set new id to task
		  		}else{
		  			for(let i=0; i<this.tasks.length; i++){
		  				if(this.tasks[i].id==this.currenttask.id){
		  					this.tasks[i]=this.currenttask;
		  					break;
		  				}
		  			}
		  			//todo update on the server
		  		}
		  		this.currenttask=new Task();
	  			this.showEditForm=false;
	  		},
	  		deleteTask(task){
	  			this.currenttask=task;
	  			this.showDeleteModal=true;
	  		},
	  		deleteTaskSuccess(){
	  			this.tasks.remove(this.currenttask);
	  			
	  			//todo: delete from the server

	  			this.currenttask=new Task();
	  			this.showDeleteModal=false;
	  		},
	  		deleteTaskBreak(){
	  			this.showDeleteModal=false;
	  			this.currenttask=new Task();
	  		},
	  		editTask(task){
	  			this.currenttask=task.copy();
	  			this.showEditForm=true;
	  		},
	  		editTaskBreak(){
	  			this.showEditForm=false;
	  			this.currenttask=new Task();
	  		},
	  		getAllTask(){
	  			//todo: get all tasks from the server
	  			this.$http.get(this.endpoint).then(
	  				function(responce){
		  				this.tasks = responce.data;
		  				console.log(responce);
		  			}, function(error){

		  			}
		  		);
	  		}
	  	},
	}
</script>
<style scoped>
.btn-add-task{
	border: none;
	border-radius: 5px;
	height: 35px;
	background-color: #addeac;
	color: #000000;
}
.btn-add-task:hover{
    background-color: #64c162;
    color: #000;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
    transform:scale(1.1);
    backface-visibility: hidden;
    transition: 0.2s;
}
.block{
	max-width: 700px;
	margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    border-radius: 15px;
    padding: 10px;
    text-align: left;
}

.search{
    width: 130px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-image: url('./searchicon.png');
    background-position: 10px 10px; 
    background-size: 25px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

.search:focus, .search-s {
    width: calc(100% - 40px);
}
</style>