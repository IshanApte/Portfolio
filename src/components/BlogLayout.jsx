import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';

const BlogLayout = () => {
  const navigate = useNavigate();
  const blogPosts = [
    {
      id: "01",
      title: "Governance In Bloomington",
      subtitle: "How Bloomington is governed",
      date: "Apr 08, 2024",
      // comments: "4 Comments"
    }
  ];

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] pt-32 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-3xl mx-auto">
        {/* Introduction Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <h1 className="text-4xl font-normal text-gray-900 mb-6">
            Welcome to My Blog
          </h1>
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Hi, I'm Ishan Apte, a software developer and graduate student at Indiana University Bloomington. 
              Here, I share my thoughts and experiences about software development, web technologies, and my journey in tech.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              My blog focuses on topics like Three.js, React, web development, and my experiences building interactive 3D applications. 
              I also write about my learnings in graduate school and insights from working on various projects.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="h-1 w-16 bg-[#2962FF]"></div>
              <span className="text-[#2962FF] font-medium">Latest Posts</span>
            </div>
          </div>
        </motion.section>

        {/* Blog Posts */}
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 group cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="flex items-center gap-4 mb-2 text-sm text-gray-500">
              <span className="text-[#2962FF]">{post.date}</span>
              {post.comments && (
                <>
                  <span>•</span>
                  <span>{post.comments}</span>
                </>
              )}
            </div>
            
            <h2 className="text-2xl font-normal text-gray-900 mb-1 group-hover:text-[#2962FF] transition-colors">
              {post.id}. {post.title} »
            </h2>
            
            <p className="text-gray-600 text-lg font-light">
              {post.subtitle}
            </p>

            <p className="text-[#2962FF] text-sm font-medium mt-2">
              By Ishan Apte
            </p>

            <div className="h-[1px] bg-gray-200 mt-16"></div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default BlogLayout; 