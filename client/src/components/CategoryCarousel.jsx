import { Link } from 'react-router-dom';

const categoryImages = {
  electronics: [
    "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=60"
  ],
  clothing: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1bc9?auto=format&fit=crop&w=500&q=60"
  ],
  fashion: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=500&q=60"
  ],
  home: [
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1583847661884-3b63214b7e98?auto=format&fit=crop&w=500&q=60"
  ],
  furniture: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=60"
  ],
  books: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=60"
  ],
  sports: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1579952363873-63878b273468?auto=format&fit=crop&w=500&q=60"
  ],
  toys: [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1566576912906-600309db4727?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=60"
  ],
  beauty: [
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1522335789203-abd6523f7216?auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=500&q=60"
  ]
};

// Fallback pool: Generic nice patterns/textures
const defaultImages = [
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?auto=format&fit=crop&w=500&q=60"
];

// Simple string hash to number
const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const getCategoryImage = (category) => {
  if (!category || !category.name) return defaultImages[0];
  
  const lowerName = category.name.toLowerCase();
  
  // Use hash of the name for deterministic selection
  const nameHash = hashCode(lowerName);

  // Try to find a matching key
  for (const [key, urls] of Object.entries(categoryImages)) {
    if (lowerName.includes(key)) {
        return urls[nameHash % urls.length];
    }
  }
  
  // Fallback
  return defaultImages[nameHash % defaultImages.length];
};

export default function CategoryCarousel({ categories }) {
    
    if (!categories || categories.length === 0) {
       return <div className="text-gray-400 text-sm py-4 text-center">Loading categories...</div>;
    }

    // Ensure enough items for smooth scroll by duplicating
    const items = [...categories, ...categories, ...categories, ...categories]; 

    return (
        <div className="w-full relative overflow-hidden">
             <div className="flex gap-4 animate-marquee-reverse hover:pause py-4">
                 {items.map((category, idx) => {
                     // We use category name hashing now, so the image is stable per category name
                     const bgImage = getCategoryImage(category);
                     
                     return (
                         <Link 
                             key={idx} 
                             to={`/products?category=${category.id}`}
                             className="flex-shrink-0 w-48 h-32 relative rounded-xl overflow-hidden group border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-4"
                         >
                             {/* Background Image */}
                             <div className="absolute inset-0">
                                 <img 
                                    src={bgImage} 
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = defaultImages[0];
                                    }}
                                 />
                                 {/* Dark Overlay for text readability */}
                                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                             </div>
                             
                             {/* Content */}
                             <span className="relative z-10 text-lg font-bold text-white text-center drop-shadow-md group-hover:scale-105 transition-transform duration-300">
                                 {category.name}
                             </span>
                         </Link>
                     );
                 })}
             </div>
             {/* Fade edges */}
             <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
             <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
         </div>
    );
}

