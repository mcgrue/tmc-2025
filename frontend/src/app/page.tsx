import Link from "next/link";

const linkCss = {
  color: "var(--geist-foreground)",
  textDecoration: "underline",
  fontWeight: "bold",
  fontSize: "1.5em",
};
const blurbCss = {
  color: "#AAA",
  fontStyle: "italic",
};

export default function Home() {
  return (
    <ol className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li>
        <Link href="/" style={linkCss}>
          Roll a Janklord
        </Link>
        <div style={blurbCss}>
          (pick from a set of three randomly-selected budget commanders to build
          a deck with)
        </div>
      </li>
    </ol>
  );
}
