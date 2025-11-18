export default function TopBarFriends() {
  return (
    <div className="h-12 flex items-center border-b border-(--border-primary) px-4 gap-4">
      <SectionTitle>Friends</SectionTitle>
      <button>Online</button>
      <button>Pending</button>
      <button>Blocked</button>

      <button className="ml-auto bg-(--accent-primary) px-3 py-1 rounded">
        Add Friend
      </button>
    </div>
  );
}
