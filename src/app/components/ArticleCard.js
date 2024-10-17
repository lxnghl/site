// src/app/components/ArticleCard.js

import Link from 'next/link';

const ArticleCard = ({ title, date, summary, link, image }) => {
  return (
    <Link href={link} className="block border rounded-lg shadow-lg overflow-hidden mb-4">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <p className="text-gray-700 mb-4">{summary}</p>
        <span className="text-blue-500 hover:underline">Read More</span>
      </div>
    </Link>
  );
};

export default ArticleCard;

