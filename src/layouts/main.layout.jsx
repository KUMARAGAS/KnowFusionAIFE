import { Outlet } from "react-router";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from "sonner";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" theme="system" />
    </div>
  );
}

export default MainLayout;
