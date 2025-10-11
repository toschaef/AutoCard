interface TopBarProps {
  name?: string;
}

export default function TopBar({ name = "Ali" }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          <div className="flex items-center space-x-4">
            <span className="text-slate-700 font-medium">
              Hello, {name}
            </span>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
