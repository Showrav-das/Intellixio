import { BackToHome } from "@/components/backToHome/backToHome";
import { headers } from "next/headers";

export const UserAgent = () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  return (
    <div>
      <BackToHome />

      {userAgent && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>

          <div className="border p-2">{userAgent}</div>
        </div>
      )}

      {!userAgent && <div>No user agent</div>}
    </div>
  );
};
