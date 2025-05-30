import { Home } from "lucide-react";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href={"/"}
      className=" 
        fixed top-4 left-4 z-50 
        flex items-center
        group 
      "
      aria-label="返回主頁"
    >
      <div
        className="
        w-12 h-12 
        bg-white hover:bg-gray-50 
        border border-gray-200 hover:border-gray-300 
        rounded-full 
        shadow-md hover:shadow-lg 
        transition-all duration-200 ease-in-out 
        flex items-center justify-center 
      "
      >
        <Home
          size={20}
          className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200"
        />
      </div>
      <span
        className="
        ml-3 px-3 py-1
        bg-white hover:bg-gray-50
        border border-gray-200 hover:border-gray-300
        rounded-lg
        shadow-md hover:shadow-lg
        text-sm text-gray-600 group-hover:text-gray-800
        transition-all duration-200 ease-in-out
        whitespace-nowrap
      "
      >
        遊戲列表
      </span>
    </Link>
  );
}
