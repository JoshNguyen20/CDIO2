import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [mealPlanCount, setMealPlanCount] = useState(null);
  const [workoutPlanCount, setWorkoutPlanCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch Dashboard Stats
        const dashboardResponse = await axios.get(
          "http://localhost:5000/api/admin/users/getDashboardStats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDashboardData(dashboardResponse.data);

        // Fetch Meal Plan Count
        const mealPlanResponse = await axios.get(
          "http://localhost:5000/api/meal-plans/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMealPlanCount(mealPlanResponse.data.weeklyMealPlanCount);

        // Fetch Workout Plan Count
        const workoutPlanResponse = await axios.get(
          "http://localhost:5000/api/workout-plans/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkoutPlanCount(workoutPlanResponse.data.weeklyWorkoutPlanCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  // Extracting data from API response
  const { totalUsers, newUsers, activeUsers, rolesStats, locationStats } = dashboardData;

  const rolesLabels = rolesStats.map((role) => role._id || "Unknown");
  const rolesData = rolesStats.map((role) => role.count);

  const locationLabels = locationStats.map((location) => location._id || "Unknown");
  const locationData = locationStats.map((location) => location.count);

  // Data for charts
  const rolesChartData = {
    labels: rolesLabels,
    datasets: [
      {
        label: "Roles",
        data: rolesData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const locationChartData = {
    labels: locationLabels,
    datasets: [
      {
        label: "Users by Location",
        data: locationData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const summaryChartData = {
    labels: ["Total Users", "New Users", "Active Users"],
    datasets: [
      {
        label: "Summary",
        data: [totalUsers, newUsers, activeUsers],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const mealWorkoutChartData = {
    labels: ["Weekly Plans"],
    datasets: [
      {
        label: "Meal Plans",
        data: [mealPlanCount],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Workout Plans",
        data: [workoutPlanCount],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard_h2">Dashboard Overview</h2>
      <p className="dashboard-p">Welcome to the admin dashboard. Here you can see key metrics and insights.</p>

      <div className="stats-summary">
        <p className="dashboard-p">Total Users: {totalUsers}</p>
        <p className="dashboard-p">New Users: {newUsers}</p>
        <p className="dashboard-p">Active Users: {activeUsers}</p>
      </div>

      {/* Summary Chart */}
      <div className="chart-section">
        <h3>User Summary</h3>
        <Pie data={summaryChartData} options={{ responsive: true }} />
      </div>

      {/* Roles Chart */}
      <div className="chart-section">
        <h3>User Roles</h3>
        <Bar data={rolesChartData} options={{ responsive: true }} />
      </div>

      {/* Location Chart */}
      <div className="chart-section">
        <h3>Users by Location</h3>
        <Pie data={locationChartData} options={{ responsive: true }} />
      </div>

      {/* Meal and Workout Plan Chart */}
      <div className="chart-section">
        <h3>Meal & Workout Plan Statistics</h3>
        {mealPlanCount !== null && workoutPlanCount !== null ? (
          <Bar data={mealWorkoutChartData} options={{ responsive: true }} />
        ) : (
          <p className="dashboard-p">Loading meal and workout plan data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
