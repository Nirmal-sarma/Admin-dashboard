import { Link } from "react-router";

export default function Home() {
  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero flex flex-col md:flex-row items-center justify-between py-16">
        {/* Hero Image */}
        <div className="w-full md:w-full flex justify-center mb-8 md:mb-0">
          <img
            src={"/assets/images/hero-img.png"}
            alt="Travel the world"
            className="rounded-lg shadow-lg max-w-xs md:max-w-md w-full h-auto object-cover"
          />
        </div>
        {/* Hero Text */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Admin Dashboard</h1>
          <p className="text-lg mb-8">
            Manage trips, users, and more with ease. Your one-stop solution for travel administration.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </a>
            <a href="/trips" className="btn btn-secondary">
              View Trips
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features grid grid-cols-1 md:grid-cols-3 gap-8 py-12 min-h-screen">
        <div className="feature-card p-4 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Trip Management</h2>
          <p className="text-base">
            Create, edit, and organize trips efficiently with our intuitive interface.
          </p>
        </div>
        <div className="feature-card p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">User Insights</h2>
          <p className="text-base">
            View and manage all registered users, track activity, and more.
          </p>
        </div>
        <div className="feature-card p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Analytics</h2>
          <p className="text-base">
            Get real-time analytics and reports to help you make informed decisions.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta flex flex-col items-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <Link to="/signIn" className="btn btn-primary">
          Sign In Now
        </Link>
      </section>
    </main>
  );
}