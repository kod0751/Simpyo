import Link from "next/link";

const columns = [
  {
    title: "지원",
    links: ["도움말 센터", "안전 정보", "취소 옵션", "문의하기"],
  },
  {
    title: "호스팅",
    links: [
      "숙소 등록하기",
      "호스트 자료실",
      "커뮤니티 포럼",
      "책임감 있는 호스팅",
    ],
  },
  {
    title: "쉼표",
    links: ["회사 소개", "뉴스룸", "채용", "투자 정보"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-xl font-bold text-primary">
              쉼표
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              당신에게 꼭 맞는 특별한 숙소를 찾아드립니다.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 쉼표. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition-colors hover:text-primary">
              개인정보 처리방침
            </Link>
            <Link href="/" className="transition-colors hover:text-primary">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
