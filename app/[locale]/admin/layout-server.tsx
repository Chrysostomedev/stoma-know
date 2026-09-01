// ✅ Server Component - porte le dynamic
export const dynamic = "force-dynamic";

export default function AdminLayoutServer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
