import React from "react";
import "./Blog.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for a Healthier Lifestyle",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Discover practical tips for a healthier life starting today.",
    date: "20-12-2024",
  },
  {
    id: 2,
    title: "How to Plan Your Weekly Workout Routine",
    image:"https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Learn how to organize your workout sessions effectively for better health.",
    date: "18-12-2024",
  },
  {
    id: 3,
    title: "Top 5 Nutrition Myths Debunked",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and dieting.",
    date: "15-12-2024",
  },
  {
    id: 4,
    title: "Top 5 Nutrition Myths Debunked",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and dieting.",
    date: "15-12-2024",
  },
  {
    id: 5,
    title: "Top 5 Nutrition Myths Debunked",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and dieting.",
    date: "15-12-2024",
  },
  {
    id: 6,
    title: "Top 5 Nutrition Myths Debunked",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and dieting.",
    date: "15-12-2024",
  },
  {
    id: 7,
    title: "Top 5 Nutrition Myths Debunked",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and dieting.",
    date: "15-12-2024",
  },
  {
    id: 8,
    title: "Top 5 Nutrition Myths Debunked",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "We debunk the most common myths about nutrition and dieting.",
    date: "15-12-2024",
  },
];

const Blog = () => {
  return (
    <div>
      <Navbar/>
      <div className="workout-header">
        <h1>Blogs</h1>
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
