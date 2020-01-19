<template>
  <div>
    <section
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

    <div class="items style3 big">
      <section class="wrapper style1 align-center">
        <div class="inner medium">
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
                  <input
                    type="submit"
                    id="create-habit"
                    name="create-habit"
                    value="Create"
                    v-on:click="createHabit()"
                  />
                </li>
              </ul>
            </div>
          </form>
        </div>
      </section>
      <div id="container" style="width: 40%; height: 400px;"></div>
      <section></section>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      habits: [],
      newHabitDescription: "",
      habitJustCompleted: false
    };
  },
  created: function() {
    axios.get("/api/habits").then(response => {
      this.habits = response.data;
    });
  },
  mounted: function() {
    var myChart = Highcharts.chart("container", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Longest Completion Streaks"
      },
      xAxis: {
        categories: [this.habitStreak[0], "data", "description"]
      },
      yAxis: {
        title: {
          text: "Day streak"
        }
      },
      series: [
        {
          name: "",
          data: [1, 0, 4]
        }
      ]
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
    changeStatus: function(habit) {
      var params = {
        completed: true,
        completion_number: (habit.completion_number += 1)
      };
      axios.patch("/api/habits/" + habit.id, params).then(response => {
        habit.completed = true;
        habit.completion_number = habit.completion_number += 1;
        this.habitJustCompleted = true;
        setTimeout(() => {
          this.habitJustCompleted = false;
        }, 1000);
      });
    }
  },

  computed: {
    completedHabits: function() {
      return this.habits.filter(habit => habit.completed);
    },
    habitStreak: function() {
      return this.habits.filter(habit => habit.completion_number >= 2);
    }
  }
};
</script>
