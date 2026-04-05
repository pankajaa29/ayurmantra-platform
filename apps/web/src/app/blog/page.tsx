import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Health & Wellness Tips',
  description: 'Discover Ayurvedic health tips, wellness advice, and natural healing insights from our expert doctors.',
};

const categories = ['All', 'Treatments', 'Wellness', 'Nutrition', 'Education'];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBlogPosts() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2600/api/v1';
    const res = await fetch(`${API_URL}/blog/published?limit=100`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.filter((post: any) => post.featured).slice(0, 2);
  const regularPosts = posts.filter((post: any) => !post.featured);

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      'Treatments': '🧘',
      'Education': '⚖️',
      'Wellness': '🌿',
      'Nutrition': '🍲',
    };
    return emojis[category] || '📖';
  };

  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              Health & Wellness Blog
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Ayurvedic Wisdom for Modern Life
            </h1>
            <p className="text-white/80 text-lg">
              Discover natural health tips, treatment guides, and wellness insights from our expert Ayurvedic doctors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg)] text-gray-600 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-16 bg-[var(--color-bg)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)]">Featured Articles</h2>
              <span className="text-sm text-[var(--color-secondary)] font-medium">⭐ Editor&apos;s Pick</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post: any) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-primary)]/20 flex items-center justify-center overflow-hidden">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl">{getCategoryEmoji(post.category)}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <span>🕐</span>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-3">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                          <span>👤</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{post.authorName}</p>
                          <p className="text-xs text-gray-500">{post.authorRole}</p>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-[var(--color-secondary)] font-medium text-sm hover:underline"
                      >
                        Read More <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-8">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.length > 0 ? (
              regularPosts.map((post: any) => (
                <article
                  key={post.id}
                  className="bg-[var(--color-bg)] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary-light)]/10 to-[var(--color-primary)]/10 flex items-center justify-center overflow-hidden">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">{getCategoryEmoji(post.category)}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-white text-[var(--color-primary)] text-xs font-medium rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[var(--color-primary)] mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                      <span className="text-sm text-gray-500">{post.authorName}</span>
                      <Link href={`/blog/${post.id}`} className="text-[var(--color-secondary)] text-sm font-medium hover:underline">
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No articles found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Never Miss a Health Tip</h2>
          <p className="text-white/90 mb-8">
            Subscribe to our newsletter and get weekly Ayurvedic health insights delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-white/70 text-sm mt-4">
            Join 5,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
