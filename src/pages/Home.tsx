// import { NavbarDemo } from "../components/NavBar"
import React, { useState } from 'react';
import { 
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
  MessageCircle,
  Settings,
  Grid,
  BookOpen,
  Bookmark,
  Users
} from 'lucide-react';

// import { PostCard } from '@/components/PostCard';
// import { Story } from '@/components/Story';
// import { Sidebar } from '@/components/Sidebar';
// import { SuggestionCard } from '@/components/SuggestionCard';

// Sample data
const posts = [
    {
      id: 1,
      user: {
        name: 'Jane Cooper',
        username: 'janecooper',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Just finished a great hike in the mountains! Nature is truly amazing. #hiking #outdoors',
      image: '../src/assets/images/hike.jpg',
      likes: 243,
      comments: 42,
      timestamp: '35m ago'
    },
    {
      id: 2,
      user: {
        name: 'Alex Johnson',
        username: 'alexj',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Working on a new project with my team. Excited to share the results soon! #coding #teamwork',
      image: '/api/placeholder/600/400',
      likes: 157,
      comments: 23,
      timestamp: '2h ago'
    },
    {
      id: 3,
      user: {
        name: 'Emily Chen',
        username: 'emilyc',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Just got accepted to my dream university! Hard work pays off. #education #achievement',
      likes: 385,
      comments: 68,
      timestamp: '4h ago'
    }
  ];
  
  // const stories = [
  //   { id: 1, username: 'your_story', avatar: '/api/placeholder/60/60', isYours: true },
  //   { id: 2, username: 'emma_w', avatar: '/api/placeholder/60/60' },
  //   { id: 3, username: 'mike_d', avatar: '/api/placeholder/60/60' },
  //   { id: 4, username: 'sara_j', avatar: '/api/placeholder/60/60' },
  //   { id: 5, username: 'robert_k', avatar: '/api/placeholder/60/60' },
  //   { id: 6, username: 'lisa_m', avatar: '/api/placeholder/60/60' }
  // ];
  
  // const suggestions = [
  //   { id: 1, name: 'David Wilson', username: 'davidw', avatar: '/api/placeholder/40/40', mutualConnections: 6 },
  //   { id: 2, name: 'Sophia Lee', username: 'sophial', avatar: '/api/placeholder/40/40', mutualConnections: 4 },
  //   { id: 3, name: 'Michael Brown', username: 'mikeb', avatar: '/api/placeholder/40/40', mutualConnections: 2 }
  // ];



const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'explore'>('feed');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      {/* <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ConnectMe</h1>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
              />
              <Search className="absolute right-3 top-2 text-gray-500" size={20} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Home size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MessageCircle size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <PlusSquare size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <img 
                src="/api/placeholder/32/32" 
                alt="Profile" 
                className="rounded-full w-8 h-8"
              />
            </button>
          </div>
        </div>
      </header> */}

      {/* <NavbarDemo /> */}

      {/* Mobile search - visible only on small screens */}
      {/* <div className="md:hidden p-2 bg-white border-b border-gray-200">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
          />
          <Search className="absolute right-3 top-2 text-gray-500" size={20} />
        </div>
      </div> */}

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 flex">
        {/* Left sidebar - visible only on medium screens and larger */}
        <aside className="hidden md:block w-64 pr-6">
          <div className="sticky top-20">
            <div className="mb-6 flex items-center space-x-3">
              <img 
                src="../src/assets/images/Profile.jpg"
                alt="Profile" 
                className="rounded-full w-12 h-12"
              />
              <div>
                <p className="font-semibold">Sam Smith</p>
                <p className="text-gray-500 text-sm">@samsmith</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600">
                <Home size={20} />
                <span className="font-medium">Home</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                <Users size={20} />
                <span>Friends</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                <BookOpen size={20} />
                <span>Newsfeed</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                <Grid size={20} />
                <span>Explore</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                <Bookmark size={20} />
                <span>Saved</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                <Settings size={20} />
                <span>Settings</span>
              </a>
            </nav>
          </div>
        </aside>
        
        {/* Main feed */}
        <div className="flex-1 max-w-2xl mx-auto">
          {/* Stories */}
          {/* <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {stories.map(story => (
                <div key={story.id} className="flex flex-col items-center flex-shrink-0">
                  <div className={`p-0.5 rounded-full ${story.isYours ? 'bg-gray-200' : 'bg-gradient-to-tr from-yellow-400 to-pink-600'}`}>
                    <div className="p-0.5 bg-white rounded-full">
                      <img 
                        src={story.avatar} 
                        alt={story.username} 
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-xs mt-1">{story.isYours ? 'Your Story' : story.username}</span>
                </div>
              ))}
            </div>
          </div> */}
          
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
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={post.user.avatar} 
                      alt={post.user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{post.user.name}</p>
                      <p className="text-gray-500 text-xs">{post.timestamp}</p>
                    </div>
                  </div>
                  <button className="text-gray-500">•••</button>
                </div>
                
                <div className="px-4 pb-3">
                  <p>{post.content}</p>
                </div>
                
                {post.image && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="object-cover w-full"
                    />
                  </div>
                )}
                
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                        <Heart size={20} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                        <MessageCircle size={20} />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-blue-500">
                      <Bookmark size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/api/placeholder/32/32" 
                      alt="Your avatar" 
                      className="w-8 h-8 rounded-full"
                    />
                    <input 
                      type="text" 
                      placeholder="Add a comment..." 
                      className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right sidebar - visible only on large screens */}
        <aside className="hidden lg:block w-80 pl-6">
          {/* <div className="sticky top-20 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold mb-4">People you may know</h3>
              <div className="space-y-4">
                {suggestions.map(suggestion => (
                  <div key={suggestion.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={suggestion.avatar} 
                        alt={suggestion.name} 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{suggestion.name}</p>
                        <p className="text-gray-500 text-xs">{suggestion.mutualConnections} mutual connections</p>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium">Follow</button>
                  </div>
                ))}
              </div>
              <button className="text-blue-600 text-sm font-medium mt-4">See All</button>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                <p className="text-sm">#Technology</p>
                <p className="text-sm">#DigitalMarketing</p>
                <p className="text-sm">#Photography</p>
                <p className="text-sm">#WorkFromHome</p>
                <p className="text-sm">#SocialMediaTips</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <div className="flex flex-wrap gap-x-2">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Help</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
              </div>
              <p className="mt-2">© 2025 ConnectMe</p>
            </div>
          </div> */}
        </aside>
      </main>
      
      {/* Mobile navigation - visible only on small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3">
        <div className="flex justify-around">
          <button className="p-1">
            <Home size={24} />
          </button>
          <button className="p-1">
            <Search size={24} />
          </button>
          <button className="p-1">
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