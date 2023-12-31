
import Link from 'next/link';

const InventoryNavbar = () => {
  return (

    <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex items-center justify-between">
      <div>
    
        <span className="text-white font-bold text-lg">Finance and billing automation</span>
      
      </div>
      <div className="flex items-center space-x-4">
      <Link href="/inventory" className="text-white">
          Inventory
        </Link>
        <Link href="/inventory/create" className="text-white">
         Create New Item
        </Link>
        <Link href="/financial" className="text-white">
         Financial Reports
        </Link>
        <Link href="/invoices" className="text-white">
         Invoice
        </Link>
        <Link href="/signout" className="text-white">
          SignOut
        </Link>
        
        
      </div>
    </div>
  </nav>
  );
};

export default InventoryNavbar;

