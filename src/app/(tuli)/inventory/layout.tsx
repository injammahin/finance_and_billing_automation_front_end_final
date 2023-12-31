import Footer from "@/app/components/Footer";
// import Footer from "../components/Footer"
import InventoryNavbar from "@/app/components/navbar";

export default async function inventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InventoryNavbar />
      {children}
      {/* <body className={inter.className}>{children}</body> */}
      {/* <Footerr></Footerr> */}
      <Footer />
    </>
  );
}
