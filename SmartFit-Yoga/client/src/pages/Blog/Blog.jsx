import React from "react";
import "./Blog.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for a Healthier Lifestyle",
    image: "https://tagalaxyfyc.com/wp-content/uploads/2023/02/2-scaled.jpg",
    description: "Discover practical tips to lead a healthier life starting today.",
    date: "December 20, 2024",
  },
  {
    id: 2,
    title: "How to Plan Your Weekly Workouts",
    image: "https://hdfitness.vn/wp-content/uploads/2022/02/phong-tap-gym-da-nang-4-min.jpg",
    description: "Learn how to organize your workouts effectively for better.",
    date: "December 18, 2024",
  },
  {
    id: 3,
    title: "Top 5 Nutrition Myths Busted",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and diets.",
    date: "December 15, 2024",
  },
  {
    id: 4,
    title: "Top 5 Nutrition Myths Busted",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and diets.",
    date: "December 15, 2024",
  },
  {
    id: 5,
    title: "Top 5 Nutrition Myths Busted",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and diets.",
    date: "December 15, 2024",
  },
  {
    id: 6,
    title: "Top 5 Nutrition Myths Busted",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and diets.",
    date: "December 15, 2024",
  },
  {
    id: 7,
    title: "Top 5 Nutrition Myths Busted",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and diets.",
    date: "December 15, 2024",
  },
  {
    id: 8,
    title: "Top 5 Nutrition Myths Busted",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and diets.",
    date: "December 15, 2024",
  },


];

const Blog = () => {
  return (
    <div>
    <Navbar/>
    <div className="workout-header">
        <h1>Our Blog</h1>
      </div>
    <div className="blog-page">
      

      {/* Blog List */}
      <div className="blog-list">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-description">{post.description}</p>
              <span className="blog-date">{post.date}</span>
              <a href={`/blog/${post.id}`} className="blog-read-more">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Blog;
