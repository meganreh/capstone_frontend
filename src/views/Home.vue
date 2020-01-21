<template>
  <div id="wrapper">
    <section class="banner style2">
      <div class="content">
        <h4>Diddit!</h4>
        <p class="major">
          Sweet! You did it!
        </p>
        <ul class="actions stacked">
          <li>
            <input
              type="button"
              class="primary"
              id="change-status"
              name="change-status"
              value="✓"
              v-on:click="changeAllStatus(habits)"
            />
          </li>
        </ul>
      </div>
      <div class="image">
        <img src="images/background.png" alt="" />
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      habits: [],
      newHabitFrequency: "",
      newHabitDescription: ""
    };
  },
  created: function() {
    axios.get("/api/habits").then(response => {
      this.habits = response.data;
    });
  },
  methods: {
    updateHabit: function(habit) {
      var params = {
        description: habit.description,
        frequency: habit.frequency
      };
      axios.patch("/api/habits/" + habit.id, params).then(response => {
        this.habit = {};
      });
    },
    changeAllStatus: function(habits) {
      this.habits.forEach(function(habit) {
        habit.completed = false;
        var params = {
          completed: habit.completed
        };
        axios.patch("/api/habits/" + habit.id, params).then(response => {
          habit.completed = false;
        });
      });
    }
  }
};
</script>
