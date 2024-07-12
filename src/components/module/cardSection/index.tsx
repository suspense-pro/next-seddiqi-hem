import { generateUniqueId } from "@utils/helpers/uniqueId";

const CardSection = ({
  title,
  Component,
  cards,
  containerStyle,
  cardStyle,
  titleStyle,
}) => {

  return (
    cards?.length > 0 && (
      <div className={containerStyle}>
        <div className={titleStyle}>{title}</div>
        <div className={cardStyle}>
          {cards.map((item, index) => (
            <Component key={generateUniqueId()} item={item} />
          ))}
        </div>
      </div>
    )
  );
};

export default CardSection;
