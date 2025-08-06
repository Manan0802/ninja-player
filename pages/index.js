import Hero from '@/components/Home/Hero';
import Search from '@/components/Home/Search';
import Gamelist from '@/components/Home/Gamelist';
import Post from '@/components/Home/Posts'; // This is your Posts.js
import app from '@/shared/FirebaseConfig';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function Home() {
  const db = getFirestore(app);
  const [post, setPosts] = useState([]);

  const getpost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts")); // Make sure the collection is named "posts"
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getpost();
  }, []);

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-6">
      <Hero />
      <Search />
      <Gamelist />
      {post.length > 0 && <Post post={post} />} {/* This passes the post array to Posts.js */}
    </div>
  );
}
