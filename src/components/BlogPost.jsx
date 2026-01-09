import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();

  // This would typically come from a database or CMS
  const post = {
    id: "01",
    title: "Governance In Bloomington",
    subtitle: "How Bloomington is governed",
    date: "Apr 08, 2024",
    content: `
      Content Coming Soon!`
  };

  return (
    <div className="w-full min-h-screen bg-background pt-32 px-4 sm:px-8 md:px-16 lg:px-32">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2 text-sm text-text-secondary">
            <span className="text-accent">{post.date}</span>
          </div>
          
          <h1 className="text-4xl font-normal text-text-primary mb-2">
            {post.id}. {post.title}
          </h1>
          
          <p className="text-text-secondary text-xl font-light mb-4">
            {post.subtitle}
          </p>
          
          <p className="text-accent text-sm font-medium mb-12">
            By Ishan Apte
          </p>
        </div>

        <article className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-text-primary mb-6 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </article>
      </motion.div>
    </div>
  );
};

export default BlogPost; 