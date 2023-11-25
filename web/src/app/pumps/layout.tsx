import SidebarMenu from "@components/SidebarMenu";

export default function PumpsLayout({
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