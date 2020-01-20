<template>
  <section class="tasks">
    <h1>
      Tasks
      <transition name="fade">
        <small v-if="incomplete">({{ incomplete }})</small>
      </transition>
    </h1>
    <div class="tasks__new input-group">
      <input
        type="text"
        class="input-group-field"
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="New task"
      />
      <span class="input-group-button">
        <button @click="addTask" class="button">
          <i class="fa fa-plus"></i> Add
        </button>
      </span>
    </div>

    <div class="tasks__clear button-group pull-right">
      <button class="button warning small" @click="clearCompleted">
        <i class="fa fa-check"></i> Clear Completed
      </button>
      <button class="button alert small" @click="clearAll">
        <i class="fa fa-trash"></i> Clear All
      </button>
    </div>

    <transition-group name="fade" tag="ul" class="tasks__list no-bullet">
      <task-item
        v-for="(task, index) in tasks"
        @remove="removeTask(index)"
        @complete="completeTask(task)"
        :task="task"
        :key="task.title"
      ></task-item>
    </transition-group>
  </section>
</template>

<script>
import TaskItem from "./TaskItem.vue";
export default {
  components: {
    TaskItem
  },
  data() {
    return {
      newTask: "",
      tasks: [
        {
          title: "Make todo list",
          completed: true
        },
        {
          title: "Go skydiving",
          completed: false
        }
      ]
    };
  },
  computed: {
    incomplete() {
      return this.tasks.filter(this.inProgress).length;
    }
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.tasks.push({
          title: this.newTask,
          completed: false
        });
        this.newTask = "";
      }
    },
    completeTask(task) {
      task.completed = !task.completed;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(this.inProgress);
    },
    clearAll() {
      this.tasks = [];
    },

    inProgress(task) {
      return !this.isCompleted(task);
    },
    isCompleted(task) {
      return task.completed;
    }
  }
};
</script>

<style>
body {
  background-color: #abc;
}

*,
h1,
button {
  font-family: "Nunito", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.tasks {
  width: 100%;
  max-width: 45rem;
  padding: 1em;
  margin: 1em auto;
  overflow: auto;
  background-color: white;
  box-shadow: 0px 0.25rem 1rem rgba(black, 0.25);
}

.tasks__list {
  clear: both;
}

.tasks__item {
  margin-bottom: 0.5em;
  position: relative;
}

.tasks__item__toggle {
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0.85em 2.25em 0.85em 1em;
  background-color: rgba(black, 0.05);
  border: 1px solid rgba(black, 0.1);
}

.tasks__item__toggle:hover {
  background-color: rgba(black, 0.1);
  border-color: rgba(black, 0.15);
}

.tasks__item__toggle--completed {
  text-decoration: line-through;
  background-color: rgba(green, 0.15);
  border-color: rgba(green, 0.2);
}

.tasks__item__toggle--completed:hover {
  background-color: rgba(green, 0.25);
  border-color: rgba(green, 0.3);
}

.tasks__item__remove {
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.tasks__item__remove i {
  vertical-align: middle;
}
</style>