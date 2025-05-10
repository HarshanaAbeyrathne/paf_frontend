import CreatePostComponent from "../components/CreatePost";
import Navbar from "../components/NavBar";

function CreatePost() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <CreatePostComponent />
      </main>
    </div>
  );
}

export default CreatePost;
