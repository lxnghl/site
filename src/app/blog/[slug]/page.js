// src/app/blog/[slug].js

import { articles } from '../../../../content/articles';
import { notFound } from 'next/navigation';

export default function ArticleContent({ params }) {
  const { slug } = params;

  // Find the article that matches the slug
  const article = articles.find((article) => article.link === slug);  // No need to check with "/blog/"

  // If the article is not found, show a 404 page
  if (!article) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
        <img 
        src={article.image}  // Add the image from the article
        alt={article.title}   // Use the article title as alt text
        className="w-full h-64 object-cover mb-4" // Style the image
      />
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{article.date}</p>
      <div className="text-gray-700">
        <p>{article.content}</p>
      </div>
    </div>
  );
}

// Generate static paths for each article (for static generation)
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.link,  // Use only the slug here
  }));
}
