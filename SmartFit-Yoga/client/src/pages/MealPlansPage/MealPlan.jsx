import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as S from './MealPlanStyles';
import './MealPlan.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const MealPlanPage = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  const dayListRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthenticated(false);
      return;
    }

    const fetchMealPlan = async () => {
      try {
        setLoading(true);

        const response = await axios.get('http://localhost:5000/api/meal-plans/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMealPlan(response.data.weeklyMealPlan);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  if (!authenticated) {
    return (
      <div>
        <Navbar />
        <div className="auth-message-container">
          <h2>Bạn cần đăng nhập để truy cập trang này.</h2>
          <button className="navigate-button" onClick={() => navigate('/login')}>
          Đi đến Đăng nhập
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='nutrition-header'>
          <h1>KẾ HOẠCH DINH DƯỠNG </h1>
      </div>
      <S.PageContainer>
        {loading ? (
          <p>Đang tải ...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <S.ContentContainer>
            <S.Sidebar>
              <S.DailyDetails>
                <S.SectionTitle>Chi tiết hàng ngày</S.SectionTitle>
                {mealPlan.week[activeDay] && (
                  <S.NutritionGrid>
                    <S.NutritionItem bgColor="#FFE4E1">
                      <span>{mealPlan.week[activeDay].totalCalories}</span>
                      <span>Calories</span>
                    </S.NutritionItem>
                    <S.NutritionItem bgColor="#E6E6FA">
                      <span>{mealPlan.week[activeDay].totalProtein}g</span>
                      <span>Protein</span>
                    </S.NutritionItem>
                    <S.NutritionItem bgColor="#E0FFF0">
                      <span>{mealPlan.week[activeDay].totalCarbs}g</span>
                      <span>Carbs</span>
                    </S.NutritionItem>
                    <S.NutritionItem bgColor="#FFFACD">
                      <span>{mealPlan.week[activeDay].totalFat}g</span>
                      <span>Fat</span>
                    </S.NutritionItem>
                  </S.NutritionGrid>
                )}
              </S.DailyDetails>
              <S.DaysOfWeek>
                <S.SectionTitle>Các ngày trong tuần</S.SectionTitle>
                <S.DayList ref={dayListRef}>
                  {mealPlan.week.map((day, index) => (
                    <S.DayItem
                      key={index}
                      active={index === activeDay}
                      hovered={index === hoveredDay}
                      onClick={() => setActiveDay(index)}
                      onMouseEnter={() => setHoveredDay(index)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {day.day}
                    </S.DayItem>
                  ))}
                </S.DayList>
              </S.DaysOfWeek>
            </S.Sidebar>
            <S.MealsContainer>
              {mealPlan.week[activeDay]?.meals.map((meal) => (
                <S.MealCard key={meal._id}>
                  <S.MealHeader>
                    <S.MealName>{meal.title}</S.MealName>
                    <S.MealType>{meal.type}</S.MealType>
                  </S.MealHeader>
                  <S.MealContent>
                    <S.SectionTitle>Nguyên liệu</S.SectionTitle>
                    <S.IngredientsList>
                      {meal.ingredients.map((ingredient, idx) => (
                        <S.IngredientItem key={idx}>{ingredient}</S.IngredientItem>
                      ))}
                    </S.IngredientsList>
                    <S.NutritionInfo>
                      <S.NutritionItem bgColor="#FFE4E1">
                        {meal.calories} Calories
                      </S.NutritionItem>
                      <S.NutritionItem bgColor="#E6E6FA">
                        {meal.macros.protein}g Protein
                      </S.NutritionItem>
                      <S.NutritionItem bgColor="#E0FFF0">
                        {meal.macros.carbs}g Carbs
                      </S.NutritionItem>
                      <S.NutritionItem bgColor="#FFFACD">
                        {meal.macros.fat}g Fat
                      </S.NutritionItem>
                    </S.NutritionInfo>
                    <S.RecipeLink>
                       <a href={meal.recipe}> {meal.recipe}</a>
                    </S.RecipeLink>
                  </S.MealContent>
                </S.MealCard>
              ))}
            </S.MealsContainer>
          </S.ContentContainer>
        )}
      </S.PageContainer>
      <Footer />
    </div>
  );
};

export default MealPlanPage;
