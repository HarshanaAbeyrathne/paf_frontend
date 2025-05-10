import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';

interface Content {
  id: number;
  path: string;
  contentType: string;
  tag: string | null;
  fileName: string;
  fileSize: number;
  fileType: string;
  duration: number | null;
}

interface PostProps {
  postId: number;
  postType: string;

  description: string;
  createdAt: string;
  contents: Content[];
}

const LikeComment = ({ postId, postType, description, createdAt, contents }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); 
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = { id: comments.length + 1, username: 'CurrentUser', text: commentText, likes: 0 };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleCommentSubmit();
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow my-6">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Post Type: {postType}</h3>
          <p className="text-gray-500 text-xs">Posted on {new Date(createdAt).toLocaleString()}</p>
        </div>
        <MoreHorizontal size={20} className="text-gray-500" />
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="mb-4">{description}</p>

        {/* Render Images */}
        {contents.length > 0 && contents.map(content => (
          <div key={content.id} className="rounded-lg overflow-hidden bg-gray-200 h-64 mb-4">
            <img 
              src={`http://localhost:8084/uploads/${content.path}`} 
              alt={content.fileName} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 border-t border-b py-2 px-4">
        <button className={`flex items-center ${liked ? 'text-red-500' : ''}`} onClick={handleLike}>
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
          <span className="ml-1">{likeCount}</span>
        </button>
        <button className="flex items-center" onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={20} />
          <span className="ml-1">{comments.length}</span>
        </button>
        <Share2 size={20} />
        <Bookmark size={20} />
      </div>

      {/* Comments */}
      {showComments && (
        <div className="p-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="bg-gray-100 rounded-lg p-2 flex-1">
                <p className="font-semibold text-sm">@{comment.username}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}

          {/* Add Comment */}
          <div className="flex items-center mt-3">
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-gray-100 rounded-full px-4 py-2 w-full mr-2"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleCommentSubmit} className="text-blue-600">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeComment;
