
import React from 'react';

interface TestimonialBlockProps {
  content?: {
    quote?: string;
    author?: string;
    role?: string;
    avatarUrl?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ content, style }) => {
  // Apply CSS classes based on style props
  const containerClass = `bg-${style?.backgroundColor || 'builder-light-blue'} p-${style?.padding || '8'} text-${style?.textAlign || 'center'}`;
  
  return (
    <div className={containerClass}>
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <svg 
            className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-200" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            aria-hidden="true"
          >
            <path 
              d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.7662 12.86C3.84023 12.86 3.05263 12.5533 2.40341 11.94C1.75419 11.3266 1.42957 10.4467 1.42957 9.29999C1.42957 8.07332 1.83616 6.87332 2.64935 5.69999C3.46253 4.49999 4.31449 3.55332 5.20523 2.85999L6.8694 4.25999C6.43106 4.73999 5.98363 5.27332 5.52712 5.85999C5.0706 6.44666 4.81407 6.95332 4.75753 7.37999C5.15096 7.37999 5.54439 7.45332 5.93782 7.59999C6.33125 7.74666 6.64449 7.97999 6.87753 8.29999C7.11057 8.61999 7.24253 8.93999 7.27342 9.25999C7.31703 9.55999 7.39762 9.93999 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0668 12.86 10.2792 12.5533 9.63 11.94C8.98079 11.3266 8.65617 10.4467 8.65617 9.29999C8.65617 8.07332 9.06276 6.87332 9.87595 5.69999C10.6891 4.49999 11.5411 3.55332 12.4318 2.85999L14.096 4.25999C13.6576 4.73999 13.2102 5.27332 12.7537 5.85999C12.2972 6.44666 12.0406 6.95332 11.9841 7.37999C12.3775 7.37999 12.771 7.45332 13.1644 7.59999C13.5578 7.74666 13.8711 7.97999 14.1041 8.29999C14.3372 8.61999 14.4691 8.93999 14.5 9.25999C14.5436 9.55999 14.6242 9.93999 14.6242 10.3Z" 
              fill="currentColor"
            />
          </svg>
          
          {content?.quote && (
            <blockquote className="text-xl text-gray-800 mt-8 mb-6">
              {content.quote}
            </blockquote>
          )}
          
          <div className="flex items-center justify-center">
            {content?.avatarUrl && (
              <img 
                src={content.avatarUrl} 
                alt={content.author || "Testimonial author"} 
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
            )}
            <div className="text-left">
              {content?.author && (
                <p className="font-semibold text-gray-900">{content.author}</p>
              )}
              {content?.role && (
                <p className="text-sm text-gray-600">{content.role}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialBlock;
