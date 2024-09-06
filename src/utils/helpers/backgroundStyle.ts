// Selects the textcolor based on the background color selection

interface backgroundStyleProps {
  backgroundColor: string;
}

export const BackgroundStyle = ({ backgroundColor }: backgroundStyleProps) => {
  const textColor = getTextcolor(backgroundColor);
  return textColor;
};

const getTextcolor = (backgroundColor: string) => {
  switch (backgroundColor) {
    case "white": // White
      return '#464F4A'; // Dark-Green
    case 'cream': // Cream
      return '#271610'; // midnight-brown
    default:
      return '#000000'; // Black
  }
};