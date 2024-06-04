

function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text text-slate-780">
        Wellcom to my Auth App !!!
      </h1>
      <p className="mb-4 text-slate-700">Our new authentication web app is built using the MERN stack (MongoDB, Express, React, and Node.js). It seamlessly integrates Google authentication, allowing users to sign in securely with their Google accounts. Additionally, we have implemented an update feature, enabling users to modify their profile information. The clean and user-friendly design is powered by Tailwind CSS, ensuring a delightful experience for our users. As we continue to enhance the app, we are excited to explore additional features and optimizations.</p>
      <p className="mb-4 text-slate-700">
      Our cutting-edge authentication web app incorporates robust security measures. We utilize modern technologies such as JSON Web Tokens (JWTs) for secure user sessions. Cookies play a crucial role in maintaining user state across requests, enhancing the overall experience. To safeguard user credentials, we employ password hashing techniques, ensuring that sensitive information remains confidential. Rest assured, our focus on security sets us apart.
      </p>
    </div>
  )
}

export default Home;