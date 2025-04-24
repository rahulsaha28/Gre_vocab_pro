import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchItem from "./SearchItem";

interface NavBarDataType {
  name: string;
  path: string;
  icon: string;
}
const navbarData = [
  {
    name: "Home",
    path: "/",
    icon: "book-open",
  },
  {
    name: "Vocabulaty",
    path: "/vocab",
    icon: "book-open",
  },
  {
    name: "Favorite",
    path: "/favorite",
    icon: "file-json-2",
  },
  {
    name: "Question",
    path: "/question",
    icon: "file-json-2",
  },
];

const NavBar = () => {
  return (
    <>
      {/* desktop navbar */}
      <nav className="hidden md:flex sticky top-0 border-b bg-background">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-orange-700">GRE</span> VOVO
          </Link>
          <SearchItem />
          <div className="flex gap-6 items-center justify-end">
            {navbarData.map(({ name, path }: NavBarDataType) => (
              <Link
                className="hover:text-blue-400 flex flex-col items-center"
                key={name}
                href={path}
              >
                <span className="ml-2 text-xl font-bold ">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* mobile navbar */}
      <div className="md:hidden fixed bottom-0 left-0 border-t min-w-full bg-background p-4 mt-200">
        <div className="container mx-auto flex items-center justify-between gap-6">
          {navbarData.map(({ name, path, icon }: NavBarDataType) => {
            if (name === "Favorite") {
              return (
                <DropdownMenu key={name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={path}>{name}</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                className="hover:text-blue-400 flex flex-col items-center"
                key={name}
                href={path}
              >
                <span className="ml-2 text-xl font-bold ">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;
