// const ProgressBar = ({ progress }) => {
//   const colors = [
//     "rgb(255, 214, 161)",
//     "rgb(255, 175, 163)",
//     "rgb(108, 115, 148)",
//     "rgb(141, 181, 145)",
//   ];
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];

//   console.log(randomColor);

//   return (
//     <div className="outer-bar">
//       <div
//         className="inner-bar"
//         style={{ width: `${progress}%`, backgroundColor: randomColor }}
//       ></div>
//     </div>
//   );
// };

// export default ProgressBar;

const ProgressBar = ({ progress }) => {
  // Function to get the color based on the progress percentage
  const getProgressColor = (progress) => {
    if (progress <= 10) {
      return "rgb(255, 59, 48)"; // Dark red for 0-10%
    } else if (progress <= 20) {
      return "rgb(255, 99, 71)"; // Reddish for 11-20%
    } else if (progress <= 30) {
      return "rgb(255, 140, 0)"; // Dark orange for 21-30%
    } else if (progress <= 40) {
      return "rgb(255, 165, 0)"; // Orange for 31-40%
    } else if (progress <= 50) {
      return "rgb(255, 193, 37)"; // Yellow-orange for 41-50%
    } else if (progress <= 60) {
      return "rgb(255, 223, 0)"; // Yellow for 51-60%
    } else if (progress <= 70) {
      return "rgb(192, 255, 0)"; // Yellow-green for 61-70%
    } else if (progress <= 80) {
      return "rgb(144, 238, 144)"; // Light green for 71-80%
    } else if (progress <= 90) {
      return "rgb(50, 205, 50)"; // Medium green for 81-90%
    } else {
      return "rgb(34, 197, 94)"; // Bright green for 91-100%
    }
  };

  const progressColor = getProgressColor(progress);

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: progressColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
