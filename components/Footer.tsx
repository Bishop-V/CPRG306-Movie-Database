// ============================================================================
// components/Footer.tsx   →   the bar across the bottom of every page
// ============================================================================
// Company details and trademark, as well as contact information.
// ----------------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 bg-stone-800 px-6 py-6">
      <div className="max-w-7xl text-sm text-gray-500 flex justify-between">
        <p className="pl-10">
          &copy; {new Date().getFullYear()} Internet Movies Rental Company. All
          rights reserved.
        </p>
        <p>Email: imr_company@gmail.com</p>
      </div>
    </footer>
  );
}
