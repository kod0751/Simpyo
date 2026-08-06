import { Star, Settings, Bell } from "lucide-react";
import type { Profile } from "@/entities/profile/model/types";

interface ProfileHeaderProps {
  profile: Profile;
}

function formatJoinDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16">
      <div className="absolute top-0 right-0 -z-10 h-[60vh] w-[30vw] rounded-bl-[120px] bg-brand-200/40 blur-2xl" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={profile.avatar_url || "/images/default-avatar.png"}
                alt={`${profile.name ?? "사용자"} 프로필 사진`}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl shadow-brand-900/10 md:h-32 md:w-32"
              />
              {profile.is_superhost && (
                <div
                  className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-brand-900 text-white shadow-sm"
                  title="슈퍼호스트"
                >
                  <Star size={14} className="fill-white" />
                </div>
              )}
            </div>
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-900/5 px-3 py-1 text-xs font-semibold text-brand-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                가입일 {formatJoinDate(profile.created_at)}
              </div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-brand-950 md:text-5xl">
                {profile.name ?? "게스트"}님,
              </h1>
              <p className="text-lg text-brand-600">
                온전한 쉼을 위한 준비가 되셨나요?
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="설정"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-900 shadow-sm transition-all hover:scale-105 hover:bg-brand-50 active:scale-95"
            >
              <Settings size={20} />
            </button>
            <button
              type="button"
              aria-label="알림"
              className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-900 shadow-sm transition-all hover:scale-105 hover:bg-brand-50 active:scale-95"
            >
              <Bell size={20} />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
