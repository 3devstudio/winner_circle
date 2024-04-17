import { Link, useLocation } from "@remix-run/react";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="w-full py-4 mx-4 pl-8">
      <div className="container mx-auto">
        <ul className="flex justify-between text-white text-xl font-light">
          <Link to="/" className={`${location.pathname === '/' ? 'border-b-2' : 'hover:border-b-2'}`}>Home</Link>
          <Link to="/about" className={`${location.pathname === '/about' ? 'border-b-2' : 'hover:border-b-2'}`}>About</Link>
          <Link to="/contact-us" className={`${location.pathname === '/contact-us' ? 'border-b-2' : 'hover:border-b-2'}`}>Contact Us</Link>
          <Link to="/photo-gallery" className={`${location.pathname === '/photo-gallery' ? 'border-b-2' : 'hover:border-b-2'}`}>Photo Gallery</Link> 
          <Link to="/submit-review" className={`${location.pathname === '/submit-review' ? 'border-b-2' : 'hover:border-b-2'}`}>Submit Review</Link>
          <Link to="/reviews" className={`${location.pathname === '/reviews' ? 'border-b-2' : 'hover:border-b-2'}`}>Our Reviews</Link>
          <Link to="/submit-waiver" className={`${location.pathname === '/submit-waiver' ? 'border-b-2' : 'hover:border-b-2'}`}>Waiver</Link>
        </ul>
      </div>
    </nav>
  )
}