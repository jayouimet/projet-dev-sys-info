import SidebarMenu from "@components/SidebarMenu";

export default function TanksLayout({
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