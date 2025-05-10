// src/services/postService.ts
import axiosInstance from "../lib/axiosInstance";

export interface Content {
  id: number;
  path: string;
  contentType: string;
  tag: string | null;
  fileName: string;
  fileSize: number;
  fileType: string;
  duration: number | null;
}

export interface Post {
  postId: number;
  userId: number;
  postType: string;
  description: string;
  createdAt: string;
  contents: Content[]; // ✅ Non-optional, always present

  user: {
    userId: number;
    userName: string;
    email: string;
    profileImage?: string;
  };

  mediaUrls?: string[];
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
  getAllPosts: async (): Promise<Post[]> => {
    const response = await axiosInstance.get('/posts');
    return response.data;
  },

  getPostById: async (postId: number): Promise<Post> => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
  },

  getPostsByUserId: async (userId: number): Promise<Post[]> => {
    const response = await axiosInstance.get(`/posts/user/${userId}`);
    return response.data;
  },

  createPost: async (postData: PostForm): Promise<Post> => {
    const formData = new FormData();
    formData.append('description', postData.description);
    if (postData.media && postData.media.length > 0) {
      postData.media.forEach(file => formData.append('media', file));
    }

    const response = await axiosInstance.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  updatePost: async (postId: number, updateData: UpdatePostForm): Promise<Post> => {
    const response = await axiosInstance.put(`/posts/${postId}`, updateData);
    return response.data;
  },

  deletePost: async (postId: number): Promise<boolean> => {
    await axiosInstance.delete(`/posts/${postId}`);
    return true;
  }
};

export default postService;
