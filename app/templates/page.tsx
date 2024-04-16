import { fetchArticle } from "@/app/lib/api";
import { ArticleProps } from "@/app/lib/types";
export default async function DashboardPage() {
  const articles = await fetchArticle();
  const Article = ({ title, content, starNum }: ArticleProps) => (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
      <div className="flex items-center mt-2">
        <span className="text-sm text-gray-500">{starNum}</span>
      </div>
    </div>
  );

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <h1 className="text-3xl font-bold">Templates</h1>
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article) => (
            <Article
              key={article.id}
              title={article.title}
              content={article.content}
              starNum={article.starnum}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
