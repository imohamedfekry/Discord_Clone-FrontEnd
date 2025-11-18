export default function TopBarServer() {
  return (
    <div className="h-12 flex items-center border-b border-(--border-primary) px-4">
      <SectionTitle># general</SectionTitle>

      <div className="ml-auto">
        <input className="px-2 py-1 bg-(--background-base-low) rounded" placeholder="Search" />
      </div>
    </div>
  );
}
