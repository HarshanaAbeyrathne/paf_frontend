import React, { useState, useEffect } from 'react';
import { 
  Home, Search, PlusSquare, Heart, User 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import postService, { Post } from '../services/PostService';
import Navbar from '../components/NavBar'; // Import the Navbar component

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'explore'>('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await postService.getAllPosts();
        setPosts(fetchedPosts);
        console.log('Fetched posts:', fetchedPosts);
        setError(null);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEditPost = (postId: number) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await postService.deletePost(postId);
      setPosts(posts.filter(post => post.postId !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  const currentUserId = 1; // Replace with auth context logic if needed

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 flex">
        {/* Left Sidebar (Navbar) */}
        <Navbar />

        {/* Main feed */}
        <div className="flex-1 max-w-2xl mx-auto">
          {/* Create Post Button */}
          <div className="mb-4">
            <button 
              onClick={() => navigate('/create-post')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
            >
              <PlusSquare size={20} className="mr-2" />
              Create New Post
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('feed')}
              className={`flex-1 py-3 font-medium text-center ${activeTab === 'feed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Feed
            </button>
            <button 
              onClick={() => setActiveTab('explore')}
              className={`flex-1 py-3 font-medium text-center ${activeTab === 'explore' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Explore
            </button>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {loading && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500">Loading posts...</p>
              </div>
            )}
            {error && (
              <div className="bg-white rounded-lg border border-red-200 p-8 text-center">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            {!loading && !error && posts.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No posts found. Create a new post!</p>
              </div>
            )}
            
            {
              !loading && !error && posts.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <p className="text-gray-500">No posts found. Create a new post!</p>
                </div>
              )
            }
              {/* <PostCard
                key={post.postId}
                id={post.postId}
                user={{
                  name: post.user.userName,
                  username: post.user.email.split('@')[0],
                  avatar: post.user.profileImage || '/api/placeholder/40/40'
                }}
                content={post.description}
                image={post.mediaUrls?.[0]}
                likes={post.likeCount || 0}
                comments={post.commentCount || 0}
                timestamp={new Date(post.createdAt).toLocaleString()}
                isCurrentUserPost={post.userId === currentUserId}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              /> */}
            
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="hidden lg:block w-80 pl-6">
          {/* Reserved for future content */}
        </aside>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3">
        <div className="flex justify-around">
          <button className="p-1">
            <Home size={24} />
          </button>
          <button className="p-1">
            <Search size={24} />
          </button>
          <button 
            className="p-1"
            onClick={() => navigate('/create-post')}
          >
            <PlusSquare size={24} />
          </button>
          <button className="p-1">
            <Heart size={24} />
          </button>
          <button className="p-1">
            <User size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
