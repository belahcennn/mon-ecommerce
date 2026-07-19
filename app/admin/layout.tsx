import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-orange-500 text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          E-SHOP ADMIN
        </h1>

        <nav className="flex flex-col gap-4">

          <Link href="/admin">
            📊 Dashboard
          </Link>

          <Link href="/admin/products">
            📦 Produits
          </Link>

          <Link href="/admin/orders">
            📋 Commandes
          </Link>

          <Link href="/admin/users">
            👥 Clients
          </Link>

          <Link href="/admin/settings">
            ⚙ Paramètres
          </Link>

        </nav>

      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>

    </div>
  );
}