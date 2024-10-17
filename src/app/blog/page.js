import ArticleCard from '../components/ArticleCard';
import { articles } from '../../../content/articles'

export default function BlogPage() {

  return (
    <div className="container mx-auto p-4">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          date={article.date}
          summary={article.summary}
          link={`/blog/${article.link}`}
          image={article.image}
        />
      ))}
    </div>
  );
}
