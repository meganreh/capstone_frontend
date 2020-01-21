<template>
  <div>
    <section v-if="tasks.length" class="spotlight style3 orient-center">
      <div class="inner medium" style="width: 80%;">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Due By</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" v-if="!task.completed">
                <td>{{ task.description }}</td>
                <td>{{ task.due_date }}</td>
                <td class="actions">
                  <input
                    type="button"
                    class="primary small"
                    id="change-status"
                    name="change-status"
                    value="Completed"
                    v-on:click="changeStatus(task)"
                  />
                </td>
                <td class="actions">
                  <input
                    type="button"
                    class="default small"
                    id="delete-task"
                    name="delete-tasks"
                    value="X"
                    v-on:click="destroyTask(task)"
                  />
                </td>
                <td class="actions">
                  <a
                    style="margin-bottom: -15px;"
                    class="button primary small"
                    target="_blank"
                    v-bind:href="googleCalendarLink(task)"
                  >
                    add to calendar
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="wrapper style1 align-center">
      <div height="250" class="inner medium">
        <h4>new task</h4>
        <form v-on:submit.prevent="createTask()">
          <div class="fields">
            <div class="field">
              <label for="task">Description</label>
              <input type="text" name="task-description" id="task-description" v-model="newTaskDescription" />
            </div>
            <div class="field">
              <label for="task-due">Due by:</label>
              <input type="date" name="due_date" id="due_date" v-model="newTaskDueDate" />
            </div>
            <ul class="actions special">
              <li>
                <br />
                <input type="submit" id="create-task" name="create-task" value="Create" />
              </li>
            </ul>
          </div>
        </form>
      </div>
    </section>
    <div id="app">
      <vue-cal
        style="height: 500px; width: 100%;"
        class="vuecal--blue-theme"
        :events="events"
        :time="false"
        :disable-views="['years']"
        :dbl-click-to-navigate="false"
      >
        <template v-slot:cell-content="{ cell, view, goNarrower, events }">
          <div class="vuecal__cell-date" :class="view.id" @click="goNarrower">
            <span class="clickable">{{ cell.content }}</span>
          </div>
          <span class="vuecal__cell-events-count" v-if="view.id === 'month' &amp;&amp; events.length">
            {{ events.length }}
          </span>
          <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) &amp;&amp; !events.length">
            Nothing here 👌
          </span>
        </template>
      </vue-cal>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import VueMoment from "vue-moment";
import moment from "moment";
import Vue from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: function() {
    return {
      tasks: [],
      newTaskDescription: "",
      newTaskDueDate: ""
    };
  },
  created: function() {
    axios.get("/api/tasks").then(response => {
      this.tasks = response.data;
    });
  },

  methods: {
    createTask: function() {
      var params = {
        description: this.newTaskDescription,
        due_date: this.newTaskDueDate
      };
      console.log(params);

      axios
        .post("/api/tasks", params)
        .then(response => {
          this.tasks.push(response.data);
          this.newTaskDescription = "";
          this.newTaskDueDate = "";
        })
        .catch(error => console.log(error.response));
    },

    changeStatus: function(task) {
      var params = {
        completed: true
      };
      axios.patch("/api/tasks/" + task.id, params).then(response => {
        task.completed = true;
        this.taskJustCompleted = true;
        setTimeout(() => {
          this.taskJustCompleted = false;
        }, 1000);
      });
    },
    destroyTask: function(task) {
      axios.delete("/api/tasks/" + task.id).then(response => {
        var index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
      });
    },
    formattedDueDate: function(task) {
      return moment(task.due_date, "DD.MM.YY").format("YYYYMMDD");
    },
    googleCalendarLink: function(task) {
      var gcalStartTime = moment(task.due_date, "MM.DD.YY").format("YYYYMMDD");
      var gcalEndTime = moment(task.due_date, "MM.DD.YY")
        .add(1, "days")
        .format("YYYYMMDD");
      return `http://www.google.com/calendar/event?action=TEMPLATE&dates=${gcalStartTime}/${gcalEndTime}&text=${task.description}&location=&details=`;
    }
  }
};
</script>
