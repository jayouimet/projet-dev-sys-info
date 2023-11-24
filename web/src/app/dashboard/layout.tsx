import SidebarMenu from "@components/SidebarMenu";

export default function DashboardLayout({
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