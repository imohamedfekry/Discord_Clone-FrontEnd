export default function TopBarDM({ dmId }) {
  return (
    <div className="h-12 flex items-center border-b border-(--border-primary) px-4">
      <div className="flex items-center gap-2">
        {/* <Avatar userId={dmId} /> */}
        <span className="font-semibold">User {dmId}</span>
      </div>
      <div className="ml-auto flex gap-3">
        {/* <ActionButton icon="phone" />
        <ActionButton icon="video" />
        <ActionButton icon="profile" /> */}
      </div>
    </div>
  );
}
