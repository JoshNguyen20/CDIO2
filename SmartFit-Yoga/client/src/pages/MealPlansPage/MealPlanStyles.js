import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Sidebar = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MealsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DailyDetails = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

export const SectionTitle = styled.h2`
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
`;

export const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const NutritionItem = styled.div`
  background-color: ${props => props.bgColor};
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  color: #333;
  font-size: 14px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  span:first-child {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
  }
`;

export const DaysOfWeek = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;

export const DayList = styled.ul`
  list-style-type: none;
  padding: 0;
  position: relative;
`;

export const DayItem = styled.li`
  padding: 5px 0 5px 20px;
  color: ${props => (props.active ? '#888888' : '#888888')};
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  &:hover {
    color: #000000;
  }

  ${props => !props.hovered && `
    padding-left: 10px;
  `}
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #98FF14;
  }
`;


export const MealCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const MealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const MealName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

export const MealType = styled.span`
  font-size: 14px;
  background-color: #f0f0f0;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
`;

export const MealContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 15px;
`;

export const IngredientItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  &:before {
    content: "•";
    color: #333;
    display: inline-block;
    width: 1em;
    margin-left: 10px;
  }
`;

export const NutritionInfo = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const MealNutritionItem = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => props.bgColor};
  color: #333;
`;

export const ChefNote = styled.div`
  background-color: #303030;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
`;

export const NoteText = styled.p`
  font-size: 14px;
  color: #00ff00;
`;

export const Loading = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  color: #666;
`;
export const RecipeLink = styled.a`
  color: #007bff; /* Màu xanh nhẹ */
  text-decoration: none; /* Loại bỏ gạch chân mặc định */
  font-weight: medium; /* Tăng độ đậm để dễ nhìn */
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Hiệu ứng chuyển đổi */
  margin-top: 10px;
  &:hover {
    color: #0056b3; /* Màu xanh đậm hơn khi hover */
    text-decoration: underline; /* Gạch chân khi hover */
  }

  &:visited {
    color: #551a8b; /* Màu tím khi đã truy cập */
  }

  &:focus {
    outline: 2px dashed #00ff00; /* Đường viền khi được focus */
    outline-offset: 2px; /* Khoảng cách viền focus */
  }
`;
