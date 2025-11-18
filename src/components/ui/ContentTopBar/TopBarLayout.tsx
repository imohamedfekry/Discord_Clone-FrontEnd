import TopBarDM from "./TopBarDM";
import TopBarFriends from "./TopBarFriends";
import TopBarServer from "./TopBarServer";

export default function TopBarLayout({ isDM, isFriends, isServer, dmId }) {
  if (isFriends) return <TopBarFriends />;
  if (isDM) return <TopBarDM dmId={dmId} />;
  if (isServer) return <TopBarServer />;
  return null;
}
