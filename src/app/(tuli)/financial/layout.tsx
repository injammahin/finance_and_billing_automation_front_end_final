import Footerr from "../../components/Footer";
import InventoryNavbar from "../../components/navbar";

export default async function financialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InventoryNavbar />
      {children}
      <Footerr />
    </>
  );
}
