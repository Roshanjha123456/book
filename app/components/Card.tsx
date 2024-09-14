import React from 'react';
import Card from './AuthorCard'; 

const cardData = [
  {
    title: "Make things float in air",
    description: "Hover over this card to unleash the power of CSS perspective",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    linkUrl: "https://twitter.com/mannupaaji"
  },
  {
    title: "Make things float in air",
    description: "Hover over this card to unleash the power of CSS perspective",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    linkUrl: "https://twitter.com/mannupaaji"
  },
  {
    title: "Make things float in air",
    description: "Hover over this card to unleash the power of CSS perspective",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    linkUrl: "https://twitter.com/mannupaaji"
  },
  {
    title: "Make things float in air",
    description: "Hover over this card to unleash the power of CSS perspective",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    linkUrl: "https://twitter.com/mannupaaji"
  },
  {
    title: "Make things float in air",
    description: "Hover over this card to unleash the power of CSS perspective",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    linkUrl: "https://twitter.com/mannupaaji"
  },
  // Add more card data here
];

const CardList = () => {
  return (

    <div>
<h1>hello</h1>
    <div className="flex justify-center gap-[30px] flex-wrap">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          linkUrl={card.linkUrl}
        />
      ))}
    </div>
</div>

  );
};

export default CardList;
