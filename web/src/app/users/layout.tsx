import SidebarMenu from "@components/SidebarMenu";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarMenu>
      {children}
    </SidebarMenu>
  );
}