
interface BackgroundStyleProps {
  backgroundColor: string;
}

// Define text color mapping based on background styles
const textColorForBackground = {
  'bg-white-text-dark-green': 'dark-green',
  'bg-cream-text-midnight-brown': 'midnight-brown',
  "bg-default-text-green": 'dark-green'
};

// Get the background style class based on the background color
const getBackgroundStyle = (backgroundColor: string): string => {
  switch (backgroundColor) {
    case 'white':
      return 'bg-white-text-dark-green';
    case 'cream':
      return 'bg-cream-text-midnight-brown';
    default:
      return 'bg-default-text-green';
  }
};

// Get the text color based on the background style class
const getTextColor = (backgroundStyle: string): string => {
  return textColorForBackground[backgroundStyle];
};

//Get background style and text color
export const BackgroundStyle = ({ backgroundColor }: BackgroundStyleProps): { backgroundStyle: string, textColor: string } => {
  const backgroundStyle = getBackgroundStyle(backgroundColor);
  const textColor = getTextColor(backgroundStyle);

  return { backgroundStyle, textColor };
};
