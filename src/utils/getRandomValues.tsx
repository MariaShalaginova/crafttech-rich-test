//функция получения рандомного цвета
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

//функция получения рандомной толщины обводки
export const getRandomStrokeWidth = () => {
  return Math.floor(Math.random() * 5) + 1;
};
