// src/services/postService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8084/api';

// Add auth token to all requests
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export interface Post {
  postId: number;
  userId: number;
  description: string;
  mediaUrls?: string[];
  createdAt: string;
  user: {
    userId: number;
    userName: string;
    email: string;
    profileImage?: string;
  };
  commentCount?: number;
  likeCount?: number;
}

export interface PostForm {
  description: string;
  media?: File[];
}

export interface UpdatePostForm {
  description: string;
}

const postService = {
  // Get all posts
  getAllPosts: async (): Promise<Post[]> => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get single post by ID
  getPostById: async (id: number): Promise<Post> => {
    try {
      const response = await axios.get(`${API_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  },

  // Get posts by user ID
  getPostsByUserId: async (userId: number): Promise<Post[]> => {
    try {
      const response = await axios.get(`${API_URL}/posts/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error;
    }
  },

  // Create new post
  createPost: async (postData: PostForm): Promise<Post> => {
    try {
      const formData = new FormData();
      formData.append('description', postData.description);
      
      if (postData.media && postData.media.length > 0) {
        postData.media.forEach(file => {
          formData.append('media', file);
        });
      }

      const response = await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Update post
  updatePost: async (id: number, updateData: UpdatePostForm): Promise<Post> => {
    try {
      const response = await axios.put(`${API_URL}/posts/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
      throw error;
    }
  },

  // Delete post
  deletePost: async (id: number): Promise<boolean> => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting post ${id}:`, error);
      throw error;
    }
  }
};

export default postService;