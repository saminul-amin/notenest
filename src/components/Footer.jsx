const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 pt-8 pb-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-col justify-between items-center gap-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">NoteNest</h2>
          <p className="text-sm text-gray-600">
            Nest your thoughts, effortlessly.
          </p>
        </div>

        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NoteNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
