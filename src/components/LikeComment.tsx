import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';

const SocialPost = () => {
  // State for the post
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [comments, setComments] = useState([
    { id: 1, username: 'Harshana Abeyrathne', text: 'Nice Picture.', likes: 5 },
    { id: 2, username: 'Ravindu Idammalgoda', text: 'Nice.', likes: 3 },
    {id: 2, username: 'Divyani Piyathilaka', text: 'Great Post.', likes: 3 }
  ]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(true);

  // Handle like button click
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        username: 'samsmith',
        text: commentText,
        likes: 0
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  // Handle key press in comment input
  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  // Toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img src="/src/assets/images/ProfilePicture.png" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold">Kaleesha Dilum</h3>
              <p className="text-gray-500 text-xs">Posted 2 hours ago</p>
            </div>
          </div>
          <button className="text-gray-500">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        {/* Post Content */}
        <div className="mb-4">
          <p className="mb-4">
            Just finished working on an amazing project! Here's a sneak peek of what I've been working on for the past few weeks. Would love to hear your thoughts!
          </p>
          <div className="rounded-lg overflow-hidden bg-gray-200 h-64 mb-2">
            <img 
              src="/src/assets/images/hike.jpg" 
              alt="Post image" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between text-gray-500 border-t border-b py-2">
          <button 
            className={`flex items-center space-x-1 ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center space-x-1" onClick={toggleComments}>
            <MessageCircle size={20} />
            <span>{comments.length}</span>
          </button>
          <button className="flex items-center space-x-1">
            <Share2 size={20} />
          </button>
          <button className="flex items-center space-x-1">
            <Bookmark size={20} />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                  <img src="/src/assets/images/Profile.jpg" alt="Commenter" className="w-full h-full object-cover" />
                </div>
                <div className="bg-gray-100 rounded-lg p-2 flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">@{comment.username}</p>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Heart size={12} className="mr-1" /> {comment.likes}
                    </div>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}

            {/* Add Comment Input */}
            <div className="flex items-center mt-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-3 flex-shrink-0">
                <img src="/api/placeholder/50/50" alt="Your profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="bg-gray-100 rounded-full px-4 py-2 w-full pr-10"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  onClick={handleCommentSubmit}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialPost;