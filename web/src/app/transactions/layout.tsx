import SidebarMenu from "@components/SidebarMenu";

export default function TransactionsLayout({
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