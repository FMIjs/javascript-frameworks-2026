import { UserNav } from "./components/nav";

export default function UserLayout(props: LayoutProps<"/user">) {
  const { children } = props;
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 w-full flex-col py-32 px-16 bg-white dark:bg-black">
          <UserNav />
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}