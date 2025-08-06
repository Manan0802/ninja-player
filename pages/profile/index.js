import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import app from '../../shared/FirebaseConfig';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import PostItem from '../../components/Home/PostItem';
import Toast from '../../components/Toast';

function Profile() {
  const { data: session } = useSession();
  const [userPost, setUserPost] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    if (session?.user?.email) {
      getUserPost();
    }
  }, [session]);

  const getUserPost = async () => {
    setUserPost([]);
    const q = query(
      collection(db, 'posts'),
      where('CreatedBy', '==', session.user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id };
      setUserPost((prev) => [...prev, data]);
    });
  };

  const onDeletePost = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    setShowToast(true);
    getUserPost(); // refresh the post list after deletion
  };

  return (
    <div className="p-6 mt-8">
      {showToast && (
        <div className="absolute top-10 right-10 z-50">
          <Toast
            msg="Post Deleted Successfully"
            closeToast={() => setShowToast(false)}
          />
        </div>
      )}

      <h2 className="text-[35px] font-extrabold text-blue-500">Profile</h2>
      <p className="mb-4">Manage Your Posts</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
        {userPost.map((item, index) => (
          <div key={index}>
            <PostItem post={item} modal={true} />
            <button
              className="bg-red-500 hover:bg-red-600 w-full p-2 mt-1 rounded-md text-white"
              onClick={() => onDeletePost(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
