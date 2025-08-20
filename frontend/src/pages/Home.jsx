import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#2a2a3d] to-[#1c1c2e] flex items-center justify-center px-4 py-12">
  <div className="max-w-5xl w-full mx-auto text-center">
    {/* Heading */}
    <div className="mb-16">
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400 drop-shadow-lg">
        Your Notes, <br />
        Organized.
      </h1>
      <p className="text-lg md:text-2xl text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed">
        Create, manage, and organize your thoughts with elegance. Your second brain, simplified.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
      {[
        {
          icon: "✍️",
          title: "Easy Writing",
          desc: "Craft and edit notes seamlessly with our intuitive editor."
        },
        {
          icon: "🏷️",
          title: "Smart Tags",
          desc: "Sort with ease using smart tags and priorities."
        },
        {
          icon: "🔒",
          title: "Secure",
          desc: "End-to-end encryption ensures privacy and peace of mind."
        }
      ].map((feature, idx) => (
        <div
          key={idx}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        >
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-white/70">{feature.desc}</p>
        </div>
      ))}
    </div>

    {/* Call to Action */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {user ? (
        <>
          <Link
            to="/create-note"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Create Your First Note
          </Link>
          <Link
            to="/dashboard"
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 transition-all shadow-md hover:shadow-lg"
          >
            View My Notes
          </Link>
        </>
      ) : (
        <div className="bg-white/5 border border-white/20 backdrop-blur-md p-8 rounded-3xl shadow-lg max-w-md mx-auto text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-white/80 mb-6">Click the Login button above to start your note-taking journey.</p>
          <div className="text-4xl animate-bounce">👆</div>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default Home;