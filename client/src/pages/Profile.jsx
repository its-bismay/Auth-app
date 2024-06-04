import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase"
import { useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signout } from "../redux/user/userSlice";

function Profile() {
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch()
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [uploadpercent, setUploadPercent] = useState(0)
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({})
  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])
  const handleFileUpload = async (img) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + img.name
    const storegRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storegRef, img)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(Math.round(progress))
      }
    ),
    (error) => {
      setUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ 
          ...formData, profilePicture: downloadURL
        })
      })
    }
    ;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        bady: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdate(true)
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data))
        return
      }
      dispatch(deleteUserSuccess())
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  const handleSignout = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signout())
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
        <img src={formData.profilePicture || currentUser.profilePicture} onClick={() => fileRef.current.click()}  alt="ProfilePicture" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"/>
        <p className="text-sm self-center">
          {uploadError ? (<span className="text-red-700">Error uploading the image.</span>) : uploadpercent > 0 && uploadpercent < 100 ? (<span className="text-slate-700">{`Uploading completed: ${uploadpercent}%`}</span>) : uploadpercent === 100 ? (<span className="text-green-700">Image uploaded successfully.</span>) : ''}
        </p>
        <input onChange={handleChange} defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3"/>
        <input onChange={handleChange} defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3"/>
        <input onChange={handleChange} type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3"/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "UPDATE"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
          <span onClick={handleDelete} className="text-red-700 cursor-pointer">
            Delete Account
          </span>
          <span onClick={handleSignout} className="text-red-700 cursor-pointer">
            Sign Out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error && 'Something wnt wrong!!!'}</p>
        <p className="text-green-700 mt-5">{update && 'User updated successfully.'}</p>
    </div>
  )
}

export default Profile