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
          headers: { Authorization: `Bearer ${token}` },
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
          <h2>You need to log in to access this page.</h2>
          <button className="navigate-button" onClick={() => navigate('/login')}>
            Go to Login
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
        <h1>NUTRITION PLAN</h1>
      </div>
      <S.PageContainer>
        {loading ? (
          <p>Loading ...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <S.ContentContainer>
            {/* Sidebar showing total calories, protein, carbs, fat */}
            <S.Sidebar>
              <S.DailyDetails>
                <S.SectionTitle>Daily Details</S.SectionTitle>
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
              {/* Select day */}
              <S.DaysOfWeek>
                <S.SectionTitle>Days of the Week</S.SectionTitle>
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

            {/* Table showing meals */}
            <S.MealsContainer>
              <S.MealsTable>
                <S.TableRow>
                  <S.MealTypeHeader>Meal</S.MealTypeHeader>
                  <S.MealTypeHeader>Dish Name</S.MealTypeHeader>
                  <S.MealTypeHeader>Calories</S.MealTypeHeader>
                  <S.MealTypeHeader>Protein</S.MealTypeHeader>
                  <S.MealTypeHeader>Carbs</S.MealTypeHeader>
                  <S.MealTypeHeader>Fat</S.MealTypeHeader>
                  <S.MealTypeHeader>Ingredients</S.MealTypeHeader>
                  <S.MealTypeHeader>Recipe</S.MealTypeHeader>
                </S.TableRow>

                {mealPlan.week[activeDay]?.meals.map((meal) => (
                  <S.TableRow key={meal._id}>
                    <S.TableCell>{meal.type}</S.TableCell>
                    <S.TableCell>{meal.title}</S.TableCell>
                    <S.TableCell>{meal.calories}</S.TableCell>
                    <S.TableCell>{meal.macros.protein}g</S.TableCell>
                    <S.TableCell>{meal.macros.carbs}g</S.TableCell>
                    <S.TableCell>{meal.macros.fat}g</S.TableCell>
                    <S.TableCell>
                      <ul>
                        {meal.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </S.TableCell>
                    <S.TableCell>
                      <a href={meal.recipe} target="_blank" rel="noopener noreferrer">
                        View Recipe
                      </a>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </S.MealsTable>
            </S.MealsContainer>
          </S.ContentContainer>
        )}
      </S.PageContainer>
      <Footer />
    </div>
  );
};

export default MealPlanPage;
