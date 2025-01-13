import React from "react";
import "./Blog.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const blogPosts = [
  {
    id: 1,
    title: "10 lời khuyên cho lối sống lành mạnh hơn",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Khám phá những mẹo thực tế để có cuộc sống khỏe mạnh hơn bắt đầu từ hôm nay.",
    date: "20-12-2024",
  },
  {
    id: 2,
    title: "Cách lên kế hoạch tập luyện hàng tuần của bạn",
    image:"https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Tìm hiểu cách tổ chức các buổi tập luyện của bạn một cách hiệu quả để có sức khỏe tốt hơn.",
    date: "18-12-2024",
  },
  {
    id: 3,
    title: "5 Hiểu lầm hàng đầu về dinh dưỡng được làm sáng tỏ",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Chúng tôi vạch trần những lầm tưởng phổ biến nhất về dinh dưỡng và chế độ ăn kiêng.",
    date: "15-12-2024",
  },
  {
    id: 4,
    title: "5 Hiểu lầm hàng đầu về dinh dưỡng được làm sáng tỏ",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Chúng tôi vạch trần những lầm tưởng phổ biến nhất về dinh dưỡng và chế độ ăn kiêng.",
    date: "15-12-2024",
  },
  {
    id: 5,
    title: "5 Hiểu lầm hàng đầu về dinh dưỡng được làm sáng tỏ",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Chúng tôi vạch trần những lầm tưởng phổ biến nhất về dinh dưỡng và chế độ ăn kiêng.",
    date: "15-12-2024",
  },
  {
    id: 6,
    title: "5 Hiểu lầm hàng đầu về dinh dưỡng được làm sáng tỏ",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Chúng tôi vạch trần những lầm tưởng phổ biến nhất về dinh dưỡng và chế độ ăn kiêng.",
    date: "15-12-2024",
  },
  {
    id: 7,
    title: "5 Hiểu lầm hàng đầu về dinh dưỡng được làm sáng tỏ",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Chúng tôi vạch trần những lầm tưởng phổ biến nhất về dinh dưỡng và chế độ ăn kiêng.",
    date: "15-12-2024",
  },
  {
    id: 8,
    title: "5 Hiểu lầm hàng đầu về dinh dưỡng được làm sáng tỏ",
    image: "https://thegrandhotram.com/wp-content/uploads/2021/11/The-Grand-Fitness-Centre-2.jpg",
    description: "Chúng tôi vạch trần những lầm tưởng phổ biến nhất về dinh dưỡng và chế độ ăn kiêng.",
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
                Đọc Thêm
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
