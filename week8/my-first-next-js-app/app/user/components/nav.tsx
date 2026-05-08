import Link from "next/link";

export const UserNav = () => {
  return (
    <nav className="flex items-center gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/user/list">User List</Link>
    </nav>
  );
}