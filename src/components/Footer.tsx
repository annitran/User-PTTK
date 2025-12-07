export default function Footer() {
    return (
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-sky-100 text-sm text-sky-900 z-50">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-center px-4">© {new Date().getFullYear()} ĐỒ ÁN PTTK</div>
      </footer>
    );
  }
