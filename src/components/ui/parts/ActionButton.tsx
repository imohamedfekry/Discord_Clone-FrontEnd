import { Phone, Video, User } from "lucide-react";

const icons = {
  phone: Phone,
  video: Video,
  profile: User
};

export default function ActionButton({ icon }) {
  const Icon = icons[icon];
  return (
    <button className="p-1 hover:bg-[var(--background-hover)] rounded">
      <Icon size={18} />
    </button>
  );
}
