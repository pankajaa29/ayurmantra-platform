import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBlogPost(id: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2600/api/v1';
    const res = await fetch(`${API_URL}/blog/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

const getCategoryEmoji = (category: string) => {
  const emojis: Record<string, string> = {
    'Treatments': '🧘',
    'Education': '⚖️',
    'Wellness': '🌿',
    'Nutrition': '🍲',
  };
  return emojis[category] || '📖';
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.id);
  
  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} - AyurMantra Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium hover:underline"
          >
            <span>←</span>
            Back to Blog
          </Link>
        </div>
      </div>

      <header className="bg-[var(--color-bg)] pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-primary)]/20 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
            {post.featuredImage ? (
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-8xl">{getCategoryEmoji(post.category)}</span>
            )}
          </div>

          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <span>👤</span>
              </div>
              <div>
                <p className="font-medium text-[var(--color-primary)]">{post.authorName}</p>
                <p>{post.authorRole}</p>
              </div>
            </div>
            <span>|</span>
            <span className="flex items-center gap-1">
              <span>📅</span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <span>🕐</span>
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-secondary)]">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="text-gray-600 space-y-4">
                <p>{post.excerpt}</p>
                <p>
                  This article explores the ancient wisdom of Ayurveda and how it can be applied 
                  to modern health challenges. Our expert practitioners share insights gained from 
                  years of clinical experience treating thousands of patients.
                </p>
                <h2>Key Takeaways</h2>
                <ul>
                  <li>Understanding your unique body constitution (Prakriti)</li>
                  <li>The importance of daily routines (Dinacharya)</li>
                  <li>How diet affects your dosha balance</li>
                  <li>Natural remedies for common health issues</li>
                </ul>
              </div>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
              <p className="text-sm text-gray-500 mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-[var(--color-bg)] text-[var(--color-primary)] text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <span className="text-gray-500 text-sm">Share this article:</span>
            <div className="flex gap-2">
              <button className="p-2 bg-[#1877F2]/10 text-[#1877F2] rounded-lg hover:bg-[#1877F2]/20 text-sm font-medium">
                FB
              </button>
              <button className="p-2 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-lg hover:bg-[#1DA1F2]/20 text-sm font-medium">
                TW
              </button>
              <button className="p-2 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg hover:bg-[#0A66C2]/20 text-sm font-medium">
                IN
              </button>
              <button className="p-2 bg-[var(--color-bg)] text-gray-600 rounded-lg hover:bg-[var(--color-border)] text-sm">
                🔗
              </button>
              <button className="p-2 bg-[var(--color-bg)] text-gray-600 rounded-lg hover:bg-[var(--color-border)] text-sm">
                🔖
              </button>
            </div>
          </div>
        </div>
      </article>

      <section className="py-12 bg-[var(--color-bg)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-3xl shrink-0">
              👨‍⚕️
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-1">{post.authorName}</h3>
              <p className="text-[var(--color-secondary)] font-medium mb-3">{post.authorRole}</p>
              <p className="text-gray-600 text-sm mb-4">
                An experienced Ayurvedic practitioner dedicated to bringing ancient healing wisdom 
                to modern healthcare. With years of clinical experience, {post.authorName?.split(' ')[1] || 'our doctor'} 
                has helped thousands of patients achieve optimal health through personalized Ayurvedic treatments.
              </p>
              <Link href="/doctors" className="text-[var(--color-secondary)] font-medium hover:underline">
                View Profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">Enjoyed This Article?</h3>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter for weekly Ayurvedic health tips and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:bg-white/20"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--color-secondary)] text-white font-medium rounded-xl hover:bg-[var(--color-secondary-dark)] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
