import styled from 'styled-components';

// Container tổng
export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #f8f9fa;
`;

// Nội dung chính
export const ContentContainer = styled.div`
  display: flex;
  width: 80%;
  max-width: 1200px;
`;

// **SIDEBAR**
export const Sidebar = styled.div`
  width: 300px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

export const DailyDetails = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Lưới dinh dưỡng
export const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const NutritionItem = styled.div`
  background: ${(props) => props.bgColor || '#ddd'};
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

// Danh sách ngày trong tuần
export const DaysOfWeek = styled.div`
  margin-top: 20px;
`;

export const DayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DayItem = styled.button`
  background: ${(props) => (props.active ? '#ff6b6b' : props.hovered ? '#ffa07a' : '#e9ecef')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: #ffa07a;
    color: #fff;
  }
`;

// **BẢNG HIỂN THỊ BỮA ĂN**
export const MealsContainer = styled.div`
  flex-grow: 1;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

// Bảng hiển thị bữa ăn
export const MealsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

// Dòng trong bảng
export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.3s ease;

  &:nth-child(even) {
    background: #f9f9f9;
  }

  &:hover {
    background: #eef6ff;
  }
`;

// Header bảng
export const MealTypeHeader = styled.th`
  background: linear-gradient(90deg,rgb(102, 162, 226), #007bff);
  color: white;
  padding: 14px;
  font-size: 15px;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  border-right: 1px solid rgba(255, 255, 255, 0.3);

  &:last-child {
    border-right: none;
  }
`;

// Ô dữ liệu trong bảng
export const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #333;
  border-right: 1px solid #e0e0e0;

  &:nth-child(1) {
    font-weight: bold;
    color: #007bff;
  }

  &:last-child {
    border-right: none;
  }
`;


// Link công thức
export const RecipeLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
