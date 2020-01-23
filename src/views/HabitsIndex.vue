<template>
  <div>
    <section
      style="padding-top: 0px; padding-bottom: 0px;"
      v-if="habits.length === 0"
      class="banner style2 orient-center content-align-center image-position-center onload-image-fade-in onload-content-fade-in"
    >
      <div class="content">
        <br />
        <span>
          <h4>Let's get started!</h4>
          <br />
          Add a habit you'd like to complete daily below!
          <br />
          For example: "Brush teeth" or "take medication."
        </span>
      </div>
    </section>
    <section
      style="padding-top: 20px; padding-bottom: 0px;"
      v-else-if="habits.length && incompleteHabits.length > 0"
      class="spotlight style2 orient-right content-align-center image-position-center onload-image-fade-in onload-content-fade-in"
    >
      <div class="content">
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr v-for="habit in habits" v-if="!habit.completed">
                <td>{{ habit.description }}</td>

                <td class="actions">
                  <input
                    type="button"
                    class="primary small"
                    id="change-status"
                    name="change-status"
                    value="Completed"
                    v-on:click="changeStatus(habit)"
                  />
                </td>
                <td class="actions">
                  <input
                    type="button"
                    class="default small"
                    id="change-status"
                    name="change-status"
                    value="Delete"
                    v-on:click="destroyHabit(habit)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="image">
        <img v-if="habitJustCompleted" src="images/yay.png" alt="" />
        <img v-else src="images/habits.png" alt="" />
      </div>
    </section>
    <section
      style="padding-top: 0px; padding-bottom: 0px;"
      v-else
      class="banner style2 orient-center content-align-center image-position-center onload-image-fade-in onload-content-fade-in"
    >
      <div class="content">
        <h4>You legend!</h4>
        <br />
        <span style="font-size: 1.25em;">Your daily habits are completed. We have no choice but to stan.</span>
      </div>
    </section>

    <section
      style="padding-top: 20px; padding-bottom: 20px;"
      v-if="completedHabits.length > 0"
      class="spotlight style2 orient-left content-align-center image-position-center onload-image-fade-in onload-content-fade-in"
    >
      <div class="content">
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr v-for="habit in habits" v-if="habit.completed">
                <td>{{ habit.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="image">
        <img src="images/complete.png" alt="" />
      </div>
    </section>

    <section class="banner style1 content-align-center onload-content-fade-in orient-left">
      <div class="content">
        <h4>new habit</h4>
        <form>
          <div class="fields">
            <div class="field">
              <label for="habit">Description</label>
              <input type="text" name="description" id="description" v-model="newHabitDescription" />
            </div>
            <ul class="actions special">
              <li>
                <br />
                <input type="submit" id="create-habit" name="create-habit" value="Create" v-on:click="createHabit()" />
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div
        v-show="habitStreak.length > 0"
        class="image"
        id="container"
        style="height: 400px; margin-right: 50px;"
      ></div>
    </section>
  </div>
</template>

<style>
@import "https://code.highcharts.com/css/highcharts.css";
.highcharts-color-0 {
  fill: #2c848f;
  stroke: #2c848f;
}
</style>

<script>
/* global Highcharts */

import axios from "axios";

export default {
  data: function() {
    return {
      habits: [],
      newHabitDescription: "",
      habitJustCompleted: false,
      myChart: null
    };
  },
  created: function() {},
  mounted: function() {
    axios.get("/api/habits").then(response => {
      this.habits = response.data;

      this.myChart = Highcharts.chart("container", {
        chart: {
          styledMode: true,
          type: "bar"
        },
        title: {
          text: "Days completed in a row"
        },
        xAxis: {
          categories: this.habitStreak.map(habit => habit.description)
        },
        yAxis: {
          title: {
            text: "Days"
          }
        },
        series: [
          {
            name: "Completion streaks",
            data: this.habitStreak.map(habit => habit.completion_number)
          }
        ]
      });
    });
  },
  methods: {
    createHabit: function() {
      var params = {
        description: this.newHabitDescription
      };

      axios
        .post("/api/habits", params)
        .then(response => {
          this.habits.push(response.data);
          this.newHabitDescription = "";
        })
        .catch(error => console.log(error.response));
    },

    updateHabit: function(habit) {
      var params = {
        description: habit.description,
        completion_number: habit.completion_number
      };
      axios.patch("/api/habits/" + habit.id, params).then(response => {
        this.habit = {};
      });
    },
    destroyHabit: function(habit) {
      axios.delete("/api/habits/" + habit.id).then(response => {
        var index = this.habits.indexOf(habit);
        this.habits.splice(index, 1);
      });
    },
    changeStatus: function(habit) {
      var params = {
        completed: true,
        completion_number: (habit.completion_number += 1)
      };
      axios.patch("/api/habits/" + habit.id, params).then(response => {
        habit.completed = true;
        // habit.completion_number = habit.completion_number;
        this.habitJustCompleted = true;
        setTimeout(() => {
          this.habitJustCompleted = false;
        }, 1000);
        this.myChart.series[0].setData(this.habitStreak.map(habit => habit.completion_number));
        this.myChart.xAxis[0].setCategories(this.habitStreak.map(habit => habit.description));
      });
    }
  },

  computed: {
    completedHabits: function() {
      return this.habits.filter(habit => habit.completed);
    },
    incompleteHabits: function() {
      return this.habits.filter(habit => !habit.completed);
    },
    habitStreak: function() {
      return this.habits.filter(habit => habit.completion_number >= 2);
    }
  }
};
</script>
