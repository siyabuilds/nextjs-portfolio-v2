import Link from "next/link";

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
    viewBox="0 0 16 16"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-steel-blue/30">
      <div className="w-[85%] mx-auto px-6 md:px-12 lg:px-20 py-4 flex flex-wrap justify-center items-center gap-6 relative">
        {/* Neon dots for vibe */}
        <div className="absolute -top-1 left-1/4 w-2 h-2 rounded-full bg-neon-cyan animate-ping opacity-50"></div>
        <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-electric-orange animate-ping opacity-50"></div>
        <div className="absolute -top-1 left-3/4 w-2 h-2 rounded-full bg-vivid-violet animate-ping opacity-50"></div>

        {/* Footer content */}
        <span className="text-gray-400 text-base md:text-lg hover:text-vivid-violet transition-colors flex items-center gap-2">
          &copy; 2025{" "}
          <a
            href="https://samson.codes"
            target="_blank"
            className="hover:text-neon-cyan transition-colors"
          >
            samson.codes
          </a>
        </span>

        <span className="text-gray-500 text-base flex items-center">|</span>

        <span className="text-gray-400 text-base md:text-lg hover:text-neon-cyan transition-colors flex items-center gap-2">
          <Link
            href="https://github.com/siyabuilds"
            target="_blank"
            className="hover:text-neon-cyan transition-colors flex items-center gap-1"
          >
            <GithubIcon />
            <span className="text-gray-400">@siyabuilds</span>
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
