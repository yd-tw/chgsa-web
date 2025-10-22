import { Home } from "lucide-react";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href={"/"}
      className="group fixed top-4 left-4 z-50 flex items-center"
      aria-label="返回主頁"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-200 ease-in-out hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg">
        <Home
          size={20}
          className="text-gray-600 transition-colors duration-200 group-hover:text-gray-800"
        />
      </div>
      <span className="ml-3 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm whitespace-nowrap text-gray-600 shadow-md transition-all duration-200 ease-in-out group-hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg">
        遊戲列表
      </span>
    </Link>
  );
}
