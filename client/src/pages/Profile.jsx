import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase"

function Profile() {
  const { currentUser } = useSelector((state) => state.user)
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
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
        <img onClick={() => fileRef.current.click()} src={currentUser.profilePicture} alt="ProfilePicture" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"/>
        <p className="text-sm self-center">
          {uploadError ? (<span className="text-red-700">Error uploading the image.</span>) : uploadpercent > 0 && uploadpercent < 100 ? (<span className="text-slate-700">{`Uploading completed: ${uploadpercent}%`}</span>) : uploadpercent === 100 ? (<span className="text-green-700">Image uploaded successfully.</span>) : ''}
        </p>
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3"/>
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3"/>
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3"/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">
            Delete Account
          </span>
          <span className="text-red-700 cursor-pointer">
            Sign Out
          </span>
        </div>
      </form>
    </div>
  )
}

export default Profile